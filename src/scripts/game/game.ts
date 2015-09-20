/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

module gameName {

    export class Game extends Phaser.Game {

        constructor() {

            super(768, 768, Phaser.AUTO, 'phaserContainer', null);

            // this.state.add('Boot', Boot, false);
            // this.state.add('Preloader', Preloader, false);
            // this.state.add('MainMenu', MainMenu, false);
            // this.state.add('Level1', Level1, false);
            //
            // this.state.start('Boot');

        }

    }

    new Game();

}
