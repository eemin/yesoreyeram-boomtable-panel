/*! 
Plugin Name : Boom Table
Plugin ID : yesoreyeram-boomtable-panel
Plugin URL : https://github.com/yesoreyeram/yesoreyeram-boomtable-panel
Plugin Author : Sriramajeyam Sugumaran https://www.google.com/search?q=Sriramajeyam+Sugumaran
Plugin Version : v0.6.0
Built on : 2018-12-14 14:55
*/
System.register(["./utils"],function(exports_1,context_1){"use strict";var utils,plugin_id,defaultPattern,config;context_1&&context_1.id;return{setters:[function(utils_1){utils=utils_1}],execute:function(){plugin_id="yesoreyeram-boomtable-panel",exports_1("plugin_id",plugin_id),defaultPattern={name:void 0,pattern:void 0,disabled:!1,row_name:"_series_",col_name:"Value",delimiter:".",valueName:"avg",format:"none",decimals:2,tooltipTemplate:"Series : _series_ | Value : _value_",thresholds:"70,90",enable_bgColor:!1,bgColors:"green|orange|red",enable_bgColor_overrides:!1,bgColors_overrides:"0->green|2->red|1->yellow",enable_TextColors:!1,textColors:"white|white|white",enable_TextColor_overrides:!1,textColors_overrides:"0->white|2->white|1->white",enable_transform:!1,transform_values:"_value_|_value_|_value_",enable_transform_overrides:!1,transform_values_overrides:"0->down|1->up",enable_time_based_thresholds:!1,time_based_thresholds:[],null_color:"darkred",null_text_color:"white",null_value:"No data",enable_clickable_cells:!1,clickable_cells_link:"",filter:{value_below:"",value_above:""}},config={debug_mode:!1,error:void 0,panelDefaults:{currentOptionOverrides:[],patterns:[],defaultPattern:defaultPattern,activePatternIndex:-1,row_col_wrapper:"_",no_match_text:"N/A",default_title_for_rows:"Metric"},optionOverrides:[],valueNameOptions:[{value:"min",text:"Min"},{value:"max",text:"Max"},{value:"avg",text:"Average"},{value:"current",text:"Current"},{value:"total",text:"Total"}]},exports_1("config",config),config.optionOverrides=[utils.buildOptionOverride(["Text alignment header & footer ","TEXT_ALIGN_TABLE_HEADER",["left","right","center"],"left"],0),utils.buildOptionOverride(["Text alignment first column","TEXT_ALIGN_FIRST_COLUMN",["left","right","center"],"left"],1),utils.buildOptionOverride(["Text alignment cells / Metrics","TEXT_ALIGN_TABLE_CELLS",["left","right","center"],"left"],2),utils.buildOptionOverride(["Hide Headers","HIDE_HEADERS",["false","true"],"false"],3),utils.buildOptionOverride(["Hide first column","HIDE_FIRST_COLUMN",["false","true"],"false"],4),utils.buildOptionOverride(["Show Footers","SHOW_FOOTERS",["false","true"],"false"],5)]}}});