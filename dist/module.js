///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(["lodash", 'app/core/utils/kbn', "app/core/time_series2", "app/plugins/sdk", "./app/app", "./app/utils"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, kbn_1, time_series2_1, sdk_1, app_1, utils;
    var GrafanaBoomTableCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            }],
        execute: function() {
            sdk_1.loadPluginCss({
                dark: "plugins/" + app_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + app_1.plugin_id + "/css/default.light.css"
            });
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector, $sce) {
                    _super.call(this, $scope, $injector);
                    this.unitFormats = kbn_1.default.getUnitFormats();
                    this.valueNameOptions = app_1.config.valueNameOptions;
                    this.optionOverrides = app_1.config.optionOverrides;
                    lodash_1.default.defaults(this.panel, app_1.config.panelDefaults);
                    this.events.on("data-received", this.onDataReceived.bind(this));
                    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
                }
                GrafanaBoomTableCtrl.prototype.onInitEditMode = function () {
                    this.addEditorTab("Patterns", "public/plugins/" + app_1.plugin_id + "/partials/patterns.html", 2);
                    this.addEditorTab("Time based thresholds & Filters", "public/plugins/" + app_1.plugin_id + "/partials/patterns-advanced-options.html", 3);
                    this.addEditorTab("Options", "public/plugins/" + app_1.plugin_id + "/partials/options.html", 4);
                };
                GrafanaBoomTableCtrl.prototype.onDataReceived = function (data) {
                    this.dataReceived = data;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.seriesHandler = function (seriesData) {
                    var series = new time_series2_1.default({
                        datapoints: seriesData.datapoints || [],
                        alias: seriesData.target
                    });
                    series.flotpairs = series.getFlotPairs("connected");
                    return series;
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = {
                        name: "New Pattern",
                        pattern: "^server.*cpu$",
                        delimiter: ".",
                        valueName: "avg",
                        row_name: this.panel.row_col_wrapper + "0" + this.panel.row_col_wrapper,
                        col_name: this.panel.row_col_wrapper + "1" + this.panel.row_col_wrapper,
                        thresholds: "70,90",
                        time_based_thresholds: [],
                        enable_time_based_thresholds: false,
                        enable_bgColor: false,
                        bgColors: "green|orange|red",
                        enable_bgColor_overrides: false,
                        bgColors_overrides: "0->green|2->red|1->yellow",
                        enable_transform: false,
                        transform_values: "_value_|_value_|_value_",
                        enable_transform_overrides: false,
                        transform_values_overrides: "0->down|1->up",
                        decimals: 2,
                        format: "none",
                        null_color: "darkred",
                        null_value: "No data",
                        enable_clickable_cells: false,
                        clickable_cells_link: "",
                        filter: {
                            value_below: "",
                            value_above: "",
                        }
                    };
                    this.panel.patterns.push(newPattern);
                    this.panel.activePatternIndex = this.panel.patterns.length - 1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.movePattern = function (direction, index) {
                    var tempElement = this.panel.patterns[index];
                    if (direction === "UP") {
                        this.panel.patterns[index] = this.panel.patterns[index - 1];
                        this.panel.patterns[index - 1] = tempElement;
                        this.panel.activePatternIndex = index - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.patterns[index] = this.panel.patterns[index + 1];
                        this.panel.patterns[index + 1] = tempElement;
                        this.panel.activePatternIndex = index + 1;
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removePattern = function (index) {
                    this.panel.patterns.splice(index, 1);
                    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.clonePattern = function (index) {
                    var copiedPattern = Object.assign({}, this.panel.patterns[index]);
                    this.panel.patterns.push(copiedPattern);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.add_time_based_thresholds = function (index) {
                    var new_time_based_threshold = {
                        name: "Early morning of everyday",
                        from: "0000",
                        to: "0530",
                        enabledDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
                        threshold: "70,90"
                    };
                    if (index === 'default') {
                        this.panel.defaultPattern.time_based_thresholds = this.panel.defaultPattern.time_based_thresholds || [];
                        this.panel.defaultPattern.time_based_thresholds.push(new_time_based_threshold);
                    }
                    else {
                        this.panel.patterns[index].time_based_thresholds = this.panel.patterns[index].time_based_thresholds || [];
                        this.panel.patterns[index].time_based_thresholds.push(new_time_based_threshold);
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.remove_time_based_thresholds = function (patternIndex, index) {
                    if (patternIndex === 'default') {
                        this.panel.defaultPattern.time_based_thresholds.splice(index, 1);
                    }
                    else {
                        this.panel.patterns[patternIndex].time_based_thresholds.splice(index, 1);
                    }
                };
                GrafanaBoomTableCtrl.prototype.inverseBGColors = function (index) {
                    if (index === -1) {
                        this.panel.defaultPattern.bgColors = this.panel.defaultPattern.bgColors.split("|").reverse().join("|");
                    }
                    else {
                        this.panel.patterns[index].bgColors = this.panel.patterns[index].bgColors.split("|").reverse().join("|");
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.inverseTransformValues = function (index) {
                    if (index === -1) {
                        this.panel.defaultPattern.transform_values = this.panel.defaultPattern.transform_values.split("|").reverse().join("|");
                    }
                    else {
                        this.panel.patterns[index].transform_values = this.panel.patterns[index].transform_values.split("|").reverse().join("|");
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.computeBgColor = function (thresholds, bgColors, value) {
                    var c = "transparent";
                    if (thresholds && bgColors && typeof value === "number" && thresholds.length + 1 <= bgColors.length) {
                        bgColors = lodash_1.default.dropRight(bgColors, bgColors.length - thresholds.length - 1);
                        if (bgColors[bgColors.length - 1] === "") {
                            bgColors[bgColors.length - 1] = "transparent";
                        }
                        for (var i = thresholds.length; i > 0; i--) {
                            if (value >= thresholds[i - 1]) {
                                return utils.normalizeColor(bgColors[i]);
                            }
                        }
                        return utils.normalizeColor(lodash_1.default.first(bgColors));
                    }
                    return c;
                };
                GrafanaBoomTableCtrl.prototype.transformValue = function (thresholds, transform_values, value, displayValue, row_name, col_name) {
                    var t = value;
                    if (thresholds && transform_values && typeof value === "number" && thresholds.length + 1 <= transform_values.length) {
                        transform_values = lodash_1.default.dropRight(transform_values, transform_values.length - thresholds.length - 1);
                        if (transform_values[transform_values.length - 1] === "") {
                            transform_values[transform_values.length - 1] = "_value_";
                        }
                        for (var i = thresholds.length; i > 0; i--) {
                            if (value >= thresholds[i - 1]) {
                                return transform_values[i].replace(new RegExp("_value_", "g"), displayValue).replace(new RegExp("_row_name_", "g"), row_name).replace(new RegExp("_col_name_", "g"), col_name);
                            }
                        }
                        return lodash_1.default.first(transform_values).replace(new RegExp("_value_", "g"), displayValue).replace(new RegExp("_row_name_", "g"), row_name).replace(new RegExp("_col_name_", "g"), col_name);
                    }
                    return t;
                };
                GrafanaBoomTableCtrl.prototype.replaceFontAwesomeIcons = function (value) {
                    if (!value)
                        return value;
                    return (value + "")
                        .split(" ")
                        .map(function (a) {
                        if (a.startsWith("_fa-") && a.endsWith("_")) {
                            var icon = a.replace(/\_/g, "").split(",")[0];
                            var color = a.indexOf(",") > -1 ? " style=\"color:" + utils.normalizeColor(a.replace(/\_/g, "").split(",")[1]) + "\" " : "";
                            var repeatCount = a.split(",").length > 2 ? +(a.replace(/\_/g, "").split(",")[2]) : 1;
                            a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                        }
                        return a;
                    })
                        .join(" ");
                };
                GrafanaBoomTableCtrl.prototype.replaceWithImages = function (value) {
                    if (!value)
                        return value;
                    return (value + "")
                        .split(" ")
                        .map(function (a) {
                        if (a.startsWith("_img-") && a.endsWith("_")) {
                            a = a.slice(0, -1);
                            var imgUrl = a.replace("_img-", "").split(",")[0];
                            var imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
                            var imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";
                            var repeatCount = a.split(",").length > 3 ? +(a.replace("_img-", "").split(",")[3]) : 1;
                            a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                        }
                        return a;
                    })
                        .join(" ");
                };
                GrafanaBoomTableCtrl.prototype.getActualNameWithoutTransformSign = function (value) {
                    return (value + "")
                        .split(" ")
                        .map(function (a) {
                        if (a.startsWith("_fa-") && a.endsWith("_")) {
                            a = "";
                        }
                        if (a.startsWith("_img-") && a.endsWith("_")) {
                            a = "";
                        }
                        return a;
                    })
                        .join(" ");
                };
                GrafanaBoomTableCtrl.prototype.getDecimalsForValue = function (value, _decimals) {
                    if (lodash_1.default.isNumber(+_decimals)) {
                        var o = {
                            decimals: _decimals,
                            scaledDecimals: null
                        };
                        return o;
                    }
                    var delta = value / 2;
                    var dec = -Math.floor(Math.log(delta) / Math.LN10);
                    var magn = Math.pow(10, -dec), norm = delta / magn, // norm is between 1.0 and 10.0
                    size;
                    if (norm < 1.5) {
                        size = 1;
                    }
                    else if (norm < 3) {
                        size = 2;
                        // special case for 2.5, requires an extra decimal
                        if (norm > 2.25) {
                            size = 2.5;
                            ++dec;
                        }
                    }
                    else if (norm < 7.5) {
                        size = 5;
                    }
                    else {
                        size = 10;
                    }
                    size *= magn;
                    // reduce starting decimals if not needed
                    if (Math.floor(value) === value) {
                        dec = 0;
                    }
                    var result = {
                        decimals: Math.max(0, dec),
                        scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2
                    };
                    return result;
                };
                GrafanaBoomTableCtrl.prototype.setUnitFormat = function (subItem, index) {
                    if (index === -1) {
                        this.panel.defaultPattern.format = subItem.value;
                    }
                    else {
                        this.panel.patterns[index].format = subItem.value;
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.limitText = function (text, maxlength) {
                    if (text.split('').length > maxlength) {
                        text = text.substring(0, maxlength - 3) + "...";
                    }
                    return text;
                };
                GrafanaBoomTableCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.ctrl = ctrl;
                    this.elem = elem;
                };
                GrafanaBoomTableCtrl.prototype.getOptionOverride = function (propertyName) {
                    var option = lodash_1.default.find(this.panel.currentOptionOverrides, function (o) { return o.propertyName === propertyName; });
                    var default_option = lodash_1.default.find(app_1.config.optionOverrides, function (o) { return o.propertyName === propertyName; });
                    if (option) {
                        return option.value;
                    }
                    else
                        return default_option.defaultValue;
                };
                GrafanaBoomTableCtrl.prototype.setOptionOverride = function (propertyName, value, text) {
                    var newOverrides = [];
                    if (lodash_1.default.filter(this.panel.currentOptionOverrides, function (o) { return o.propertyName === propertyName; }).length === 0) {
                        newOverrides.push({
                            propertyName: propertyName,
                            value: value,
                            text: text
                        });
                    }
                    if (this.panel.currentOptionOverrides.length > 0) {
                        lodash_1.default.each(this.panel.currentOptionOverrides, function (o) {
                            if (o.propertyName === propertyName) {
                                newOverrides.push({
                                    propertyName: propertyName,
                                    value: value,
                                    text: text
                                });
                            }
                            else
                                newOverrides.push(o);
                        });
                    }
                    this.panel.currentOptionOverrides = newOverrides;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removeOptionOverride = function (option) {
                    var newOverrides = [];
                    if (this.panel.currentOptionOverrides.length > 0) {
                        lodash_1.default.each(this.panel.currentOptionOverrides, function (o) {
                            if (o.propertyName !== option) {
                                newOverrides.push(o);
                            }
                        });
                    }
                    this.panel.currentOptionOverrides = newOverrides;
                    this.render();
                };
                GrafanaBoomTableCtrl.templateUrl = "partials/module.html";
                return GrafanaBoomTableCtrl;
            })(sdk_1.MetricsPanelCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    // Copying the data received
                    this.dataComputed = this.dataReceived;
                    this.panel.default_title_for_rows = this.panel.default_title_for_rows || app_1.config.default_title_for_rows;
                    var metricsReceived = utils.getFields(this.dataComputed, "target");
                    if (metricsReceived.length !== lodash_1.default.uniq(metricsReceived).length) {
                        var duplicateKeys = lodash_1.default.uniq(metricsReceived.filter(function (v) {
                            return metricsReceived.filter(function (t) { return t === v; }).length > 1;
                        }));
                        var err = new Error();
                        err.name = "Duplicate data received";
                        err.message = "Duplicate keys : <br/>" + duplicateKeys.join("<br/> ");
                        this.panel.error = err;
                        this.panel.data = undefined;
                    }
                    else {
                        this.panel.error = undefined;
                        // Binding the grafana computations to the metrics received
                        this.dataComputed = this.dataReceived.map(this.seriesHandler.bind(this));
                        // Get Server Time Stamp of the Series for time based thresholds.
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.current_servertimestamp = new Date();
                            if (series && series.datapoints && series.datapoints.length > 0) {
                                if (lodash_1.default.last(series.datapoints).length === 2) {
                                    series.current_servertimestamp = new Date(lodash_1.default.last(series.datapoints)[1]);
                                }
                            }
                            return series;
                        });
                        // Assign pattern
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.pattern = lodash_1.default.find(_this.panel.patterns.filter(function (p) { return p.disabled !== true; }), function (p) {
                                return series.alias.match(p.pattern);
                            });
                            if (series.pattern === undefined) {
                                series.pattern = _this.panel.defaultPattern || app_1.config.panelDefaults.defaultPattern;
                            }
                            return series;
                        });
                        // Assign Decimal Values
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.decimals = (series.pattern.decimals) || app_1.config.panelDefaults.defaultPattern.decimals;
                            return series;
                        });
                        // Assign value
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (series.stats) {
                                series.value = series.stats[series.pattern.valueName || app_1.config.panelDefaults.defaultPattern.valueName];
                                var decimalInfo = _this.getDecimalsForValue(series.value, series.decimals);
                                var formatFunc = kbn_1.default.valueFormats[series.pattern.format || app_1.config.panelDefaults.defaultPattern.format];
                                if (series.value === null) {
                                    series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null";
                                }
                                else if (!isNaN(series.value)) {
                                    series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                                    series.valueRounded = kbn_1.default.roundValue(series.value, decimalInfo.decimals);
                                    series.displayValue = series.valueFormatted;
                                }
                                else {
                                    series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null";
                                }
                            }
                            return series;
                        });
                        // Filter Values
                        this.dataComputed = this.dataComputed.filter(function (series) {
                            if (!series.pattern.filter) {
                                series.pattern.filter = {};
                                series.pattern.filter.value_below = "";
                                series.pattern.filter.value_above = "";
                            }
                            if (series.pattern && series.pattern.filter && (series.pattern.filter.value_below !== "" || series.pattern.filter.value_above !== "")) {
                                if (series.pattern.filter.value_below !== "" && series.value < +(series.pattern.filter.value_below)) {
                                    return false;
                                }
                                if (series.pattern.filter.value_above !== "" && series.value > +(series.pattern.filter.value_above)) {
                                    return false;
                                }
                                return true;
                            }
                            else {
                                return true;
                            }
                            ;
                        });
                        // Assign Row Name
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.pattern.row_name.replace(new RegExp(_this.panel.row_col_wrapper + "series" + _this.panel.row_col_wrapper, "g"), series.alias) || app_1.config.panelDefaults.defaultPattern.row_name.replace(new RegExp(_this.panel.row_col_wrapper + "series" + _this.panel.row_col_wrapper, "g"), series.alias));
                            if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
                                series.row_name = series.alias;
                            }
                            return series;
                        });
                        // Assign Col Name
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.pattern.col_name || app_1.config.panelDefaults.defaultPattern.col_name);
                            if (series.alias.split(series.pattern.delimiter || ".").length === 1 || series.row_name === series.alias) {
                                series.col_name = series.pattern.col_name || "Value";
                            }
                            return series;
                        });
                        // Assign RowCol Key
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.key_name = series.row_name + "#" + series.col_name;
                            return series;
                        });
                        // Assign Thresholds
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.thresholds = (series.pattern.thresholds || app_1.config.panelDefaults.defaultPattern.thresholds).split(",").map(function (d) { return +d; });
                            if (series.pattern.enable_time_based_thresholds) {
                                var metricrecivedTimeStamp = series.current_servertimestamp || new Date();
                                var metricrecivedTimeStamp_innumber = metricrecivedTimeStamp.getHours() * 100 + metricrecivedTimeStamp.getMinutes();
                                var weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
                                lodash_1.default.each(series.pattern.time_based_thresholds, function (tbtx) {
                                    if (tbtx && tbtx.from && tbtx.to && tbtx.enabledDays &&
                                        (metricrecivedTimeStamp_innumber >= +(tbtx.from)) &&
                                        (metricrecivedTimeStamp_innumber <= +(tbtx.to)) &&
                                        (tbtx.enabledDays.toLowerCase().indexOf(weekdays[metricrecivedTimeStamp.getDay()]) > -1) &&
                                        tbtx.threshold) {
                                        series.thresholds = (tbtx.threshold + "").split(",").map(function (d) { return +d; });
                                    }
                                });
                            }
                            return series;
                        });
                        // Assign BG Colors
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_bgColor = series.pattern.enable_bgColor;
                            series.bgColors = (series.pattern.bgColors || app_1.config.panelDefaults.defaultPattern.bgColors).split("|");
                            series.bgColor = series.enable_bgColor === true ? _this.computeBgColor(series.thresholds, series.bgColors, series.value) : "transparent";
                            if (series.displayValue === (series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null")) {
                                series.bgColor = series.pattern.null_color || app_1.config.panelDefaults.defaultPattern.null_color;
                            }
                            return series;
                        });
                        // BG Colors overrides 
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_bgColor_overrides = series.pattern.enable_bgColor_overrides;
                            series.bgColors_overrides = series.pattern.bgColors_overrides || "";
                            if (series.enable_bgColor_overrides && series.bgColors_overrides !== "") {
                                var _bgColors_overrides = series.bgColors_overrides.split("|").filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                                if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                                    series.bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
                                }
                            }
                            return series;
                        });
                        // Value Transform
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_transform = series.pattern.enable_transform;
                            series.transform_values = (series.pattern.transform_values || app_1.config.panelDefaults.defaultPattern.transform_values).split("|");
                            series.displayValue = series.enable_transform === true ? _this.transformValue(series.thresholds, series.transform_values, series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
                            if (series.displayValue === (series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null")) {
                                series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value;
                            }
                            else if (isNaN(series.value)) {
                                series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value;
                            }
                            return series;
                        });
                        // Value Transform Overrides
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_transform_overrides = series.pattern.enable_transform_overrides;
                            series.transform_values_overrides = series.pattern.transform_values_overrides || "";
                            if (series.enable_transform_overrides && series.transform_values_overrides !== "") {
                                var _transform_values_overrides = series.transform_values_overrides.split("|").filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                                if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
                                    series.displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), series.displayValue).replace(new RegExp("_row_name_", "g"), series.row_name).replace(new RegExp("_col_name_", "g"), series.col_name);
                                }
                            }
                            return series;
                        });
                        // Font awesome icons
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.actual_displayvalue = series.displayValue;
                            series.actual_row_name = series.row_name;
                            series.actual_col_name = series.col_name;
                            if (series.displayValue && series.displayValue.indexOf("_fa-") > -1)
                                series.displayValue = _this.replaceFontAwesomeIcons(series.displayValue);
                            if (series.row_name && series.row_name.indexOf("_fa-") > -1)
                                series.row_name = _this.replaceFontAwesomeIcons(series.row_name);
                            if (series.col_name && series.col_name.indexOf("_fa-") > -1)
                                series.col_name = _this.replaceFontAwesomeIcons(series.col_name);
                            return series;
                        });
                        // Image transforms
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (series.displayValue && series.displayValue.indexOf("_img-") > -1)
                                series.displayValue = _this.replaceWithImages(series.displayValue);
                            if (series.row_name && series.row_name.indexOf("_img-") > -1)
                                series.row_name = _this.replaceWithImages(series.row_name);
                            if (series.col_name && series.col_name.indexOf("_img-") > -1)
                                series.col_name = _this.replaceWithImages(series.col_name);
                            return series;
                        });
                        // Cell Links
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (series.pattern.enable_clickable_cells) {
                                var targetLink = series.pattern.clickable_cells_link || "#";
                                targetLink = targetLink.replace(new RegExp("_row_name_", "g"), _this.getActualNameWithoutTransformSign(series.actual_row_name).trim());
                                targetLink = targetLink.replace(new RegExp("_col_name_", "g"), _this.getActualNameWithoutTransformSign(series.actual_col_name).trim());
                                targetLink = targetLink.replace(new RegExp("_value_", "g"), _this.getActualNameWithoutTransformSign(series.value).trim());
                                series.displayValue = "<a href=\"" + targetLink + "\" target=\"_blank\">" + series.displayValue + "</a>";
                            }
                            return series;
                        });
                        // Display overrides
                        var text_align_table_header = this.getOptionOverride("TEXT_ALIGN_TABLE_HEADER");
                        var text_align_first_column = this.getOptionOverride("TEXT_ALIGN_FIRST_COLUMN");
                        var text_align_table_cells = this.getOptionOverride("TEXT_ALIGN_TABLE_CELLS");
                        var hide_headers = this.getOptionOverride("HIDE_HEADERS") === "true";
                        var hide_first_column = this.getOptionOverride("HIDE_FIRST_COLUMN") === "true";
                        // Grouping
                        var rows_found = utils.getFields(this.dataComputed, "row_name");
                        var cols_found = utils.getFields(this.dataComputed, "col_name");
                        var keys_found = utils.getFields(this.dataComputed, "key_name");
                        var is_unique_keys = (keys_found.length === lodash_1.default.uniq(keys_found).length);
                        if (is_unique_keys) {
                            this.panel.error = undefined; ////
                            var output = [];
                            lodash_1.default.each(lodash_1.default.uniq(rows_found), function (row_name) {
                                var o = {};
                                o.row = row_name;
                                o.cols = [];
                                lodash_1.default.each(lodash_1.default.uniq(cols_found), function (col_name) {
                                    var matched_value = (lodash_1.default.find(_this.dataComputed, function (e) {
                                        return e.row_name === row_name && e.col_name === col_name;
                                    }));
                                    if (!matched_value)
                                        matched_value = {
                                            value: NaN,
                                            displayValue: "N/A"
                                        };
                                    o.cols.push({
                                        "name": col_name,
                                        "value": matched_value.value,
                                        "actual_col_name": matched_value.actual_col_name,
                                        "actual_row_name": matched_value.actual_row_name,
                                        "displayValue": matched_value.displayValue || matched_value.value,
                                        "bgColor": matched_value.bgColor || "transparent"
                                    });
                                });
                                output.push(o);
                            });
                            //region Output table construction
                            var boomtable_output_body_headers = this.elem.find("#boomtable_output_body_headers");
                            var boomtable_output_body_headers_output = "<br/>";
                            if (hide_headers !== true) {
                                boomtable_output_body_headers_output += "<tr>";
                                if (hide_first_column !== true) {
                                    boomtable_output_body_headers_output += "<th style=\"padding:4px;text-align:" + text_align_table_header + "\">" + this.panel.default_title_for_rows + "</th>";
                                }
                                lodash_1.default.each(lodash_1.default.uniq(cols_found), function (c) {
                                    boomtable_output_body_headers_output += "<th style=\"padding:4px;text-align:" + text_align_table_header + "\">" + c + "</th>";
                                });
                                boomtable_output_body_headers_output += "</tr>";
                            }
                            boomtable_output_body_headers.html(boomtable_output_body_headers_output);
                            var boomtable_output_body = this.elem.find('#boomtable_output_body');
                            var boomtable_output_body_output = "";
                            lodash_1.default.each(output, function (o) {
                                boomtable_output_body_output += "<tr>";
                                if (hide_first_column !== true) {
                                    boomtable_output_body_output += "<td style=\"padding:4px;text-align:" + text_align_first_column + "\">" + o.row + "</td>";
                                }
                                lodash_1.default.each(o.cols, function (c) {
                                    boomtable_output_body_output += "<td \n              style=\"padding:4px;background-color:" + c.bgColor + ";text-align:" + text_align_table_cells + "\" \n              title=\"" + ("Row Name : " + _this.getActualNameWithoutTransformSign(c.actual_row_name) + "\nCol Name : " + _this.getActualNameWithoutTransformSign(c.actual_col_name) + "\nValue : " + c.value) + "\"\n            >" + c.displayValue + "</td>";
                                });
                                boomtable_output_body_output += "</tr>";
                            });
                            boomtable_output_body.html(boomtable_output_body_output);
                        }
                        else {
                            var duplicateKeys = lodash_1.default.uniq(keys_found.filter(function (v) {
                                return keys_found.filter(function (t) { return t === v; }).length > 1;
                            }));
                            var err = new Error();
                            err.name = "Duplicate keys found";
                            err.message = "Duplicate key values : <br/>" + duplicateKeys.join("<br/> ");
                            this.panel.error = err;
                        }
                        //region Debug table body construction
                        var boomtable_output_body_debug = this.elem.find('#boomtable_output_body_debug');
                        var boomtable_output_body_debug_output = "";
                        lodash_1.default.each(this.dataComputed, function (d) {
                            boomtable_output_body_debug_output += "\n        <tr>\n          <td style=\"padding:4px;\" width=\"40%\">" + d.alias + "</td>\n          <td style=\"padding:4px;\">" + (d.pattern.pattern || "Default") + "</td>\n          <td style=\"padding:4px;background-color:" + d.bgColor + "\">" + d.displayValue + "</td>\n          <td style=\"padding:4px;\">" + d.row_name + "</td>\n          <td style=\"padding:4px;\">" + d.col_name + "</td>\n          <td style=\"padding:4px;\">" + d.thresholds + "</td>\n        </tr>\n        ";
                        });
                        boomtable_output_body_debug.html(boomtable_output_body_debug_output);
                    }
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var maxheightofpanel = this.panel.debug_mode ? this.ctrl.height - 71 : this.ctrl.height - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map