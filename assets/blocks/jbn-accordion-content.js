(function(blocks, i18n, element, components, blockEditor) {
    const el = element.createElement;
    const useBlockProps = blockEditor.useBlockProps;
    const types = [ {
        value: "h1",
        label: wp.i18n.__("Header 1")
    }, {
        value: "h2",
        label: wp.i18n.__("Header 2")
    }, {
        value: "h3",
        label: wp.i18n.__("Header 3")
    }, {
        value: "h4",
        label: wp.i18n.__("Header 4")
    }, {
        value: "h5",
        label: wp.i18n.__("Header 5")
    }, {
        value: "h6",
        label: wp.i18n.__("Header 6")
    } ];
    const icon = el("svg", {
        width: 36,
        height: 36
    }, el("path", {
        d: "M16.0156 9.42419L13.0459 6.45459L11.9853 7.51519L15.4853 11.0152L16.0156 11.5456L16.5459 11.0152L20.0459 7.51519L18.9852 6.45459L16.0156 9.42419ZM4 9.5H10V8H4V9.5ZM20 14.5V16H4V14.5H20Z"
    }));
    const template = [ [ "core/paragraph", {
        placeholder: "Content"
    } ] ];
    blocks.registerBlockType("jbn/accordion-content", {
        title: i18n.__("Accordion Item"),
        description: i18n.__("Accordion item"),
        category: "jbn-jquery-category",
        apiVersion: 2,
        icon: icon,
        parent: [ "jbn/accordion" ],
        attributes: {
            content: {
                type: "string"
            },
            header: {
                type: "string",
                default: "h3"
            }
        },
        edit: function(props) {
            const blockProps = useBlockProps({
                style: {
                    padding: "2rem"
                }
            });
            return [ el(wp.element.Fragment, {}, el(wp.blockEditor.InspectorControls, {
                key: "inspector"
            }, el(wp.components.PanelBody, {
                title: i18n.__("Settings")
            }, el(wp.components.SelectControl, {
                label: wp.i18n.__("Header"),
                options: types,
                value: props.attributes.header,
                onChange: val => props.setAttributes({
                    header: val
                })
            })))), el("div", blockProps, el(wp.blockEditor.RichText, {
                tagName: props.attributes.header,
                allowedFormats: [ "core/bold" ],
                placeholder: i18n.__("Label"),
                value: props.attributes.content,
                onChange: val => props.setAttributes({
                    content: val
                })
            }), el(wp.blockEditor.InnerBlocks, {
                template: template
            })) ];
        },
        save: function(props) {
            const blockProps = useBlockProps.save();
            return [ el(wp.blockEditor.RichText.Content, {
                tagName: props.attributes.header,
                value: props.attributes.content
            }), el("div", blockProps, el(wp.blockEditor.InnerBlocks.Content)) ];
        }
    });
})(window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.components, window.wp.blockEditor);