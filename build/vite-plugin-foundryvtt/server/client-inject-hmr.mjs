if (import.meta.hot) {
    import.meta.hot.on('foundryvtt-template-update', ({ path }) => {
        console.log('Vite | Force reload template', path);
        Handlebars.unregisterPartial(path);
        foundry.applications.handlebars.getTemplate(path);
        // TODO: this does not cause a rerender yet
    });

    import.meta.hot.on('foundryvtt-language-update', (data) => {
        console.log('Language Update', data);
    });
} else console.error('Vite | HMR is disabled');
