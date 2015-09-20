/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameName;
(function (gameName) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 768, 768, Phaser.AUTO, 'phaserContainer', null);
            // this.state.add('Boot', Boot, false);
            // this.state.add('Preloader', Preloader, false);
            // this.state.add('MainMenu', MainMenu, false);
            // this.state.add('Level1', Level1, false);
            //
            // this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    gameName.Game = Game;
    new Game();
})(gameName || (gameName = {}));
