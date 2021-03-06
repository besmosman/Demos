/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2015
 * @compiler Bridge.NET 16.0.0-beta5
 */
Bridge.assembly("FormBuilder", function ($asm, globals) {
    "use strict";

    Bridge.define("DTO.Form", {
        props: {
            Fields: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Fields = new (System.Collections.Generic.List$1(DTO.FormField))();
            },
            $ctor1: function (obj) {
                DTO.Form.ctor.call(this);
                var $t, $t1;
                var rawFields = obj.Fields;

                $t = Bridge.getEnumerator(rawFields);
                try {
                    while ($t.moveNext()) {
                        var rawField = $t.Current;
                        if (Bridge.referenceEquals(rawField.Kind, DTO.FormFieldType.Radio)) {
                            this.Fields.add(($t1 = new DTO.RadioFormField(), $t1.Id = rawField.Id, $t1.Label = rawField.Label, $t1.Options = rawField.Options, $t1));
                        } else {
                            this.Fields.add(($t1 = new DTO.TextFormField(), $t1.Id = rawField.Id, $t1.Label = rawField.Label, $t1.Required = rawField.Required, $t1));
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
    }
    });

    Bridge.define("DTO.FormField", {
        props: {
            Kind: 0,
            Id: null,
            Label: null
        }
    });

    Bridge.define("DTO.FormFieldType", {
        $kind: "enum",
        statics: {
            fields: {
                Text: 0,
                Radio: 1
            }
        }
    });

    Bridge.define("FormBuilder.App", {
        statics: {
            fields: {
                FORM_TEMPLATE_DATA: null,
                FORM_CONTAINER: null,
                SUBMIT_URL: null
            },
            ctors: {
                init: function () {
                    this.FORM_TEMPLATE_DATA = "FormTemplate.ashx";
                    this.FORM_CONTAINER = "#form1";
                    this.SUBMIT_URL = "/Submit.aspx";
                    Bridge.ready(this.Main);
                }
            },
            methods: {
                Main: function () {
                    // fetch form template from http handler and start building form
                    $.ajax({ url: FormBuilder.App.FORM_TEMPLATE_DATA, cache: false, success: $asm.$.FormBuilder.App.f1 });
                },
                CreateForm: function (container, template) {
                    var $t, $t1;
                    $t = Bridge.getEnumerator(template.Fields);
                    try {
                        while ($t.moveNext()) {
                            var field = $t.Current;
                            container.append(FormBuilder.App.CreateFormField(field));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }
                    container.append($("<div>").addClass("form-group").append($("<div>").addClass("col-sm-offset-2 col-sm-10").append($(($t1 = document.createElement('input'), $t1.type = "submit", $t1.value = "Submit", $t1.className = "btn btn-primary", $t1.formAction = FormBuilder.App.SUBMIT_URL, $t1.formMethod = "POST", $t1)))));
                },
                CreateFormField: function (template) {
                    switch (template.Kind) {
                        case DTO.FormFieldType.Radio: 
                            return FormBuilder.App.CreateRadioInput(template.Id, template.Label, Bridge.cast(template, DTO.RadioFormField).Options);
                        default: 
                            return FormBuilder.App.CreateTextInput(template.Id, template.Label, Bridge.cast(template, DTO.TextFormField).Required);
                    }
                },
                CreateRadioInput: function (id, label, options) {
                    var $t;
                    var divRadio = $("<div>");
                    divRadio.addClass("col-sm-10");

                    for (var i = 0; i < options.length; i = (i + 1) | 0) {
                        divRadio.append($("<label>").addClass("radio-inline").append(($t = document.createElement('input'), $t.type = "radio", $t.id = System.String.concat(id, "-", i), $t.name = id, $t.value = options[System.Array.index(i, options)], $t)).append(options[System.Array.index(i, options)]));
                    }

                    return $("<div>").addClass("form-group").append(($t = document.createElement('label'), $t.className = "control-label col-sm-2", $t.htmlFor = id, $t.innerHTML = System.String.concat(label, ":"), $t)).append(divRadio);
                },
                CreateTextInput: function (id, label, required) {
                    var $t;
                    if (required === void 0) { required = false; }
                    return $("<div>").addClass("form-group").append(($t = document.createElement('label'), $t.className = "control-label col-sm-2", $t.htmlFor = id, $t.innerHTML = System.String.concat(label, ":"), $t)).append($("<div>").addClass("col-sm-10").append(($t = document.createElement('input'), $t.type = "text", $t.id = id, $t.name = id, $t.required = required, $t.className = "form-control", $t)));
                }
            }
        },
        $entryPoint: true
    });

    Bridge.ns("FormBuilder.App", $asm.$);

    Bridge.apply($asm.$.FormBuilder.App, {
        f1: function (data, str, jqXHR) {
            var template = new DTO.Form.$ctor1(data);
            FormBuilder.App.CreateForm($(FormBuilder.App.FORM_CONTAINER), template);
        }
    });

    Bridge.define("DTO.RadioFormField", {
        inherits: [DTO.FormField],
        props: {
            Options: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                DTO.FormField.ctor.call(this);
                this.Kind = DTO.FormFieldType.Radio;
            }
        }
    });

    Bridge.define("DTO.TextFormField", {
        inherits: [DTO.FormField],
        props: {
            Required: false
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                DTO.FormField.ctor.call(this);
                this.Kind = DTO.FormFieldType.Text;
                this.Required = false;
            }
        }
    });
});
