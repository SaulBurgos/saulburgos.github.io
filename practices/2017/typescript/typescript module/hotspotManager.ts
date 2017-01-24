export interface IhotspotOptions {
    id: number;
    title: string;
}

export interface IhotspotClass {
    id: number;
    title: string;
    getContent(): string;
}

export class hotspotBase implements IhotspotClass {
    id: number;
    title: string;
    type: string;
    content: string;
    
    constructor(options: IhotspotOptions) {
        this.id = options.id;
        this.title = options.title;
    }

    getContent(): string {
        return this.content;
    }
}

export class hotspotText extends hotspotBase {
    content: string;
    type: string = 'text';

    constructor(options: IhotspotOptions) {
        super(options);
        this.content = 'html text';
    }        
}

export class hotspotVideo extends hotspotBase {
    content: string;
    type: string = 'text';

    constructor(options: IhotspotOptions) {
        super(options);
        this.content = 'Youtube video';
    }
}

export class hotspotImage extends hotspotBase {
    content: string;
    type: string = 'text';

    constructor(options: IhotspotOptions) {
        super(options);
        this.content = 'image link';
    }
}
