class Panel {
    constructor ($panel, $tools, opened) {
        this.$panel = $panel;
        this.$tools = $tools;
        this.opened = opened | false;
        this.$container = $('.img-container', this.$panel);
    }
    
    load(part) {
        this.part = part;
	    if (this.opened) this.open();    
	}
    
    open() {
        this.opened = true;
        this.$panel.show();
        Cookies.set(this.$panel.attr('id'), true);
    }
    close() {
        this.opened = false;
        this.$panel.hide();
        Cookies.set('trans-panel-open', false);
    }
    toggle() {
        if (this.opened) this.close();
        else this.open();
    }
    reset() {}
}
