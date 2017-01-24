var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var hotspotBase = (function () {
        function hotspotBase(options) {
            this.id = options.id;
            this.title = options.title;
        }
        hotspotBase.prototype.getContent = function () {
            return this.content;
        };
        return hotspotBase;
    }());
    exports.hotspotBase = hotspotBase;
    var hotspotText = (function (_super) {
        __extends(hotspotText, _super);
        function hotspotText(options) {
            var _this = _super.call(this, options) || this;
            _this.type = 'text';
            _this.content = 'html text';
            return _this;
        }
        return hotspotText;
    }(hotspotBase));
    exports.hotspotText = hotspotText;
    var hotspotVideo = (function (_super) {
        __extends(hotspotVideo, _super);
        function hotspotVideo(options) {
            var _this = _super.call(this, options) || this;
            _this.type = 'text';
            _this.content = 'Youtube video';
            return _this;
        }
        return hotspotVideo;
    }(hotspotBase));
    exports.hotspotVideo = hotspotVideo;
    var hotspotImage = (function (_super) {
        __extends(hotspotImage, _super);
        function hotspotImage(options) {
            var _this = _super.call(this, options) || this;
            _this.type = 'text';
            _this.content = 'image link';
            return _this;
        }
        return hotspotImage;
    }(hotspotBase));
    exports.hotspotImage = hotspotImage;
});
//# sourceMappingURL=hotspotManager.js.map