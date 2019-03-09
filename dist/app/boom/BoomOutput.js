System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, BoomOutput;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            BoomOutput = (function () {
                function BoomOutput(options) {
                    this.default_title_for_rows = options.default_title_for_rows || "";
                    this.hide_first_column = options.hide_first_column;
                    this.hide_headers = options.hide_headers;
                    this.text_alignment_firstcolumn = options.text_alignment_firstcolumn || "";
                    this.text_alignment_header = options.text_alignment_header || "";
                    this.text_alignment_values = options.text_alignment_values || "";
                }
                return BoomOutput;
            }());
            exports_1("BoomOutput", BoomOutput);
            BoomOutput.prototype.getDataAsHTML = function (data) {
                var _this = this;
                var output = {
                    body: "",
                    footer: "",
                    headers: ""
                };
                if (this.hide_headers !== true) {
                    output.headers += "<tr>";
                    if (this.hide_first_column !== true) {
                        output.headers += "<th style=\"padding:4px;text-align:" + this.text_alignment_firstcolumn + "\">" + this.default_title_for_rows + "</th>";
                    }
                    lodash_1.default.each(data.cols_found, function (c) {
                        output.headers += "<th style=\"padding:4px;text-align:" + _this.text_alignment_header + "\">" + c + "</th>";
                    });
                    output.body += "</tr>";
                }
                lodash_1.default.each(data.output, function (o) {
                    if (o.map(function (item) { return item.hidden.toString(); }).indexOf("false") > -1) {
                        output.body += "<tr>";
                        if (_this.hide_first_column !== true) {
                            output.body += "\n                    <td style=\"padding:4px;text-align:" + _this.text_alignment_firstcolumn + "\">\n                        " + lodash_1.default.first(o.map(function (item) { return item.row_name; })) + "\n                    </td>";
                        }
                        lodash_1.default.each(o, function (item) {
                            var item_style = "padding:4px;background-color:" + item.color_bg + ";color:" + item.color_text + ";text-align:" + _this.text_alignment_values;
                            var item_display = item.link === "#"
                                ? item.display_value
                                : "<a href=\"" + item.link + "\" target=\"_blank\" style=\"color:" + item.color_text + "\">" + item.display_value + "</a>";
                            var tooltip = !item.tooltip || item.tooltip === "-"
                                ? undefined
                                : " data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"auto\" title=\"" + item.tooltip + "\" ";
                            output.body += "\n                    <td style=\"" + item_style + "\">\n                        " + (tooltip ? "<span " + tooltip + ">" : "") + "\n                            " + item_display + "\n                        " + (tooltip ? "</span>" : "") + "\n                    </td>\n                ";
                        });
                        output.body += "</tr>";
                    }
                });
                return output;
            };
            BoomOutput.prototype.getDataAsDebugHTML = function (data) {
                var debugdata = "";
                debugdata = lodash_1.default.map(data, function (d) {
                    return "\n        <tr>\n            <td style=\"padding:4px;text-align:left;width:30%; title=\"Series Name\" >" + d.seriesName + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Matching Pattern Name\" >" + (d.pattern.name || d.pattern.pattern || "Default") + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Value : " + String(d.value_formatted || "null") + " / Raw : " + String(d.value || "null") + " / Stat : " + d.pattern.valueName + "\">" + d.display_value + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Row name\" >" + d.row_name + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Col name\" >" + d.col_name + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Thresholds\" >" + d.thresholds.join(",") + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"BG Color\" >" + d.color_bg + "</td>\n            <td style=\"padding:4px;text-align:left;width:10%; title=\"Text Color\" >" + d.color_text + "</td>\n        </tr>\n        ";
                }).join("");
                return debugdata;
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbU91dHB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvYm9vbS9Cb29tT3V0cHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBR0E7Z0JBU0Usb0JBQVksT0FBOEI7b0JBQ3hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxPQUFPLENBQUMsc0JBQXNCLElBQUksRUFBRSxDQUFDO29CQUNuRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO29CQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7b0JBQ3pDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxPQUFPLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDO29CQUMzRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQztvQkFDakUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLENBQUM7Z0JBQ25FLENBQUM7Z0JBQ0gsaUJBQUM7WUFBRCxDQUFDLEFBakJELElBaUJDOztZQUNELFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVMsSUFBZ0I7Z0JBQXpCLGlCQTJEcEM7Z0JBMURDLElBQUksTUFBTSxHQUFjO29CQUN0QixJQUFJLEVBQUUsRUFBRTtvQkFDUixNQUFNLEVBQUUsRUFBRTtvQkFDVixPQUFPLEVBQUUsRUFBRTtpQkFDWixDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7b0JBQzlCLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO29CQUN6QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7d0JBQ25DLE1BQU0sQ0FBQyxPQUFPLElBQUksd0NBQ2hCLElBQUksQ0FBQywwQkFBMEIsV0FDNUIsSUFBSSxDQUFDLHNCQUFz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QUN6SCxDQUFDLENBQUMsUUFBUSxrR0FDVixDQUFDLENBQUMsUUFBUSxvR0FDUixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0dBQ3hCLENBQUMsQ0FBQyxRQUFRLG9HQUNSLENBQUMsQ0FBQyxVQUFVLG1DQUV2RixDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDWixPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IElCb29tSFRNTCwgSUJvb21UYWJsZSwgSUJvb21SZW5kZXJpbmdPcHRpb25zICwgSUJvb21TZXJpZXMgfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvb21PdXRwdXQge1xyXG4gIHB1YmxpYyBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBTdHJpbmc7XHJcbiAgcHVibGljIGhpZGVfZmlyc3RfY29sdW1uOiBCb29sZWFuO1xyXG4gIHB1YmxpYyBoaWRlX2hlYWRlcnM6IEJvb2xlYW47XHJcbiAgcHVibGljIHRleHRfYWxpZ25tZW50X2ZpcnN0Y29sdW1uOiBTdHJpbmc7XHJcbiAgcHVibGljIHRleHRfYWxpZ25tZW50X2hlYWRlcjogU3RyaW5nO1xyXG4gIHB1YmxpYyB0ZXh0X2FsaWdubWVudF92YWx1ZXM6IFN0cmluZztcclxuICBwdWJsaWMgZ2V0RGF0YUFzSFRNTDtcclxuICBwdWJsaWMgZ2V0RGF0YUFzRGVidWdIVE1MO1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElCb29tUmVuZGVyaW5nT3B0aW9ucykge1xyXG4gICAgdGhpcy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzID0gb3B0aW9ucy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IFwiXCI7XHJcbiAgICB0aGlzLmhpZGVfZmlyc3RfY29sdW1uID0gb3B0aW9ucy5oaWRlX2ZpcnN0X2NvbHVtbjtcclxuICAgIHRoaXMuaGlkZV9oZWFkZXJzID0gb3B0aW9ucy5oaWRlX2hlYWRlcnM7XHJcbiAgICB0aGlzLnRleHRfYWxpZ25tZW50X2ZpcnN0Y29sdW1uID0gb3B0aW9ucy50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbiB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0X2FsaWdubWVudF9oZWFkZXIgPSBvcHRpb25zLnRleHRfYWxpZ25tZW50X2hlYWRlciB8fCBcIlwiO1xyXG4gICAgdGhpcy50ZXh0X2FsaWdubWVudF92YWx1ZXMgPSBvcHRpb25zLnRleHRfYWxpZ25tZW50X3ZhbHVlcyB8fCBcIlwiO1xyXG4gIH1cclxufVxyXG5Cb29tT3V0cHV0LnByb3RvdHlwZS5nZXREYXRhQXNIVE1MID0gZnVuY3Rpb24oZGF0YTogSUJvb21UYWJsZSk6IElCb29tSFRNTCB7XHJcbiAgbGV0IG91dHB1dDogSUJvb21IVE1MID0ge1xyXG4gICAgYm9keTogXCJcIixcclxuICAgIGZvb3RlcjogXCJcIixcclxuICAgIGhlYWRlcnM6IFwiXCJcclxuICB9O1xyXG4gIGlmICh0aGlzLmhpZGVfaGVhZGVycyAhPT0gdHJ1ZSkge1xyXG4gICAgb3V0cHV0LmhlYWRlcnMgKz0gXCI8dHI+XCI7XHJcbiAgICBpZiAodGhpcy5oaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xyXG4gICAgICBvdXRwdXQuaGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjoke1xyXG4gICAgICAgIHRoaXMudGV4dF9hbGlnbm1lbnRfZmlyc3Rjb2x1bW5cclxuICAgICAgfVwiPiR7dGhpcy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzfTwvdGg+YDtcclxuICAgIH1cclxuICAgIF8uZWFjaChkYXRhLmNvbHNfZm91bmQsIGMgPT4ge1xyXG4gICAgICBvdXRwdXQuaGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjoke1xyXG4gICAgICAgIHRoaXMudGV4dF9hbGlnbm1lbnRfaGVhZGVyXHJcbiAgICAgIH1cIj4ke2N9PC90aD5gO1xyXG4gICAgfSk7XHJcbiAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XHJcbiAgfVxyXG4gIF8uZWFjaChkYXRhLm91dHB1dCwgbyA9PiB7XHJcbiAgICBpZiAoby5tYXAoaXRlbSA9PiBpdGVtLmhpZGRlbi50b1N0cmluZygpKS5pbmRleE9mKFwiZmFsc2VcIikgPiAtMSkge1xyXG4gICAgICBvdXRwdXQuYm9keSArPSBcIjx0cj5cIjtcclxuICAgICAgaWYgKHRoaXMuaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcclxuICAgICAgICBvdXRwdXQuYm9keSArPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjoke1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtblxyXG4gICAgICAgICAgICAgICAgICAgIH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtfLmZpcnN0KG8ubWFwKGl0ZW0gPT4gaXRlbS5yb3dfbmFtZSkpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+YDtcclxuICAgICAgfVxyXG4gICAgICBfLmVhY2gobywgaXRlbSA9PiB7XHJcbiAgICAgICAgbGV0IGl0ZW1fc3R5bGUgPSBgcGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjoke2l0ZW0uY29sb3JfYmd9O2NvbG9yOiR7XHJcbiAgICAgICAgICBpdGVtLmNvbG9yX3RleHRcclxuICAgICAgICB9O3RleHQtYWxpZ246JHt0aGlzLnRleHRfYWxpZ25tZW50X3ZhbHVlc31gO1xyXG4gICAgICAgIGxldCBpdGVtX2Rpc3BsYXkgPVxyXG4gICAgICAgICAgaXRlbS5saW5rID09PSBcIiNcIlxyXG4gICAgICAgICAgICA/IGl0ZW0uZGlzcGxheV92YWx1ZVxyXG4gICAgICAgICAgICA6IGA8YSBocmVmPVwiJHtpdGVtLmxpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgc3R5bGU9XCJjb2xvcjoke1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xvcl90ZXh0XHJcbiAgICAgICAgICAgICAgfVwiPiR7aXRlbS5kaXNwbGF5X3ZhbHVlfTwvYT5gO1xyXG4gICAgICAgIGxldCB0b29sdGlwID1cclxuICAgICAgICAgICFpdGVtLnRvb2x0aXAgfHwgaXRlbS50b29sdGlwID09PSBcIi1cIlxyXG4gICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA6IGAgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgZGF0YS1odG1sPVwidHJ1ZVwiIGRhdGEtcGxhY2VtZW50PVwiYXV0b1wiIHRpdGxlPVwiJHtcclxuICAgICAgICAgICAgICAgIGl0ZW0udG9vbHRpcFxyXG4gICAgICAgICAgICAgIH1cIiBgO1xyXG4gICAgICAgIG91dHB1dC5ib2R5ICs9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCIke2l0ZW1fc3R5bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8c3BhbiAke3Rvb2x0aXB9PmAgOiBcIlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtX2Rpc3BsYXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8L3NwYW4+YCA6IFwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgIH0pO1xyXG4gICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG91dHB1dDtcclxufTtcclxuQm9vbU91dHB1dC5wcm90b3R5cGUuZ2V0RGF0YUFzRGVidWdIVE1MID0gZnVuY3Rpb24oZGF0YTogSUJvb21TZXJpZXNbXSApOiBzdHJpbmcge1xyXG4gIGxldCBkZWJ1Z2RhdGEgPSBgYDtcclxuICAgIGRlYnVnZGF0YSA9IF8ubWFwKGRhdGEsIGQgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MzAlOyB0aXRsZT1cIlNlcmllcyBOYW1lXCIgPiR7ZC5zZXJpZXNOYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246bGVmdDt3aWR0aDoxMCU7IHRpdGxlPVwiTWF0Y2hpbmcgUGF0dGVybiBOYW1lXCIgPiR7ZC5wYXR0ZXJuLm5hbWUgfHwgZC5wYXR0ZXJuLnBhdHRlcm4gfHwgXCJEZWZhdWx0XCJ9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpsZWZ0O3dpZHRoOjEwJTsgdGl0bGU9XCJWYWx1ZSA6ICR7U3RyaW5nKGQudmFsdWVfZm9ybWF0dGVkIHx8IFwibnVsbFwiKX0gLyBSYXcgOiAke1N0cmluZyhkLnZhbHVlIHx8IFwibnVsbFwiKX0gLyBTdGF0IDogJHtkLnBhdHRlcm4udmFsdWVOYW1lfVwiPiR7ZC5kaXNwbGF5X3ZhbHVlfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246bGVmdDt3aWR0aDoxMCU7IHRpdGxlPVwiUm93IG5hbWVcIiA+JHtkLnJvd19uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246bGVmdDt3aWR0aDoxMCU7IHRpdGxlPVwiQ29sIG5hbWVcIiA+JHtkLmNvbF9uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246bGVmdDt3aWR0aDoxMCU7IHRpdGxlPVwiVGhyZXNob2xkc1wiID4ke2QudGhyZXNob2xkcy5qb2luKFwiLFwiKX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAlOyB0aXRsZT1cIkJHIENvbG9yXCIgPiR7ZC5jb2xvcl9iZ308L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAlOyB0aXRsZT1cIlRleHQgQ29sb3JcIiA+JHtkLmNvbG9yX3RleHR9PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIGA7XHJcbiAgICB9KS5qb2luKGBgKTtcclxuICAgIHJldHVybiBkZWJ1Z2RhdGE7XHJcbn07XHJcbiJdfQ==