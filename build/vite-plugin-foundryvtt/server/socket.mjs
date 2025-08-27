import fs from 'fs-extra';
import path from 'path';
import { Server as SocketServer } from 'socket.io';
import { io as ClientIO } from 'socket.io-client';
import { manifestCache } from '../config/manifest.mjs';
import { templateTracker } from './template-tracker.mjs';

export default function socketProxy(server, options) {
    const ioProxy = new SocketServer(server.httpServer, { path: '/socket.io' });

    ioProxy.on('connection', (socket) => {
        const upstream = ClientIO(`http://localhost:${options.foundryPort}`, {
            transports: ['websocket'],
            upgrade: false,
            query: socket.handshake.query,
        });

        // Browser >>> Foundry [intercept templating calls]
        socket.onAny((event, ...args) => {
            const maybeAck = typeof args[args.length - 1] === 'function' ? args.pop() : null;

            if (event === 'template') {
                let requestedUrl = path.posix.normalize(`/${args[0]}`);

                // intercept the template
                // check if our decodedBase is in args[0], if yes sub decodedBase with cwd
                if (requestedUrl.startsWith(manifestCache.config.decodedBase)) {
                    requestedUrl = requestedUrl.replace(manifestCache.config.decodedBase, '');

                    // check if file exists either in our current path or publicDir
                    const fileCandidates = [manifestCache.config.publicDir, manifestCache.config.root].map((dir) =>
                        path.join(dir, requestedUrl),
                    );
                    for (const file of fileCandidates) {
                        // if it exists, use maybeAck({ html: filecontents, success: true })
                        if (!fs.existsSync(file)) continue;
                        if (!maybeAck) continue;
                        maybeAck({ html: fs.readFileSync(file, 'utf8'), success: true });
                        templateTracker.addTemplate(file);
                        return;
                    }
                    // fallback instead
                }
            }

            upstream.emit(event, ...args, (response) => {
                if (maybeAck) maybeAck(response);
            });
        });

        // Foundry >>> Browser [just forward]
        upstream.onAny((event, ...args) => {
            const lastArg = args[args.length - 1];
            const maybeAck = typeof lastArg === 'function' ? args.pop() : null;
            socket.emit(event, ...args, (response) => {
                if (maybeAck) maybeAck(response);
            });
        });
    });
}
