(function(blocks, i18n, element, components, blockEditor) {
    const el = element.createElement;
    const useBlockProps = blockEditor.useBlockProps;
    const icon = el("svg", {
        width: 36,
        height: 36
    }, el("path", {
        d: "M4 6.5H20V5H4V6.5ZM4 12.5H10V11H4V12.5ZM20 17.5V19H4V17.5H20ZM16.0156 12.4242L13.0459 9.45459L11.9853 10.5152L15.4853 14.0152L16.0156 14.5456L16.5459 14.0152L20.0459 10.5152L18.9852 9.45459L16.0156 12.4242Z"
    }));
    const template = [ [ "jbn/accordion-content" ] ];
    blocks.registerBlockType("jbn/accordion", {
        title: i18n.__("Accordion"),
        description: i18n.__("Displays collapsible content panels for presenting information in a limited amount of space."),
        category: "jbn-jquery-category",
        apiVersion: 2,
        icon: icon,
        supports: {
            align: true
        },
        attributes: {
            id: {
                type: "string",
                default: ""
            },
            mode: {
                type: "boolean",
                default: 1
            },
            items: {
                type: "number",
                default: 1
            }
        },
        edit: function(props) {
            const blockProps = useBlockProps({
                style: {
                    border: "1px Dashed rgba(0,0,0,0.2)",
                    borderRadius: "0.25rem",
                    minHeight: "5rem"
                }
            });
            return [ el(wp.element.Fragment, {}, el(wp.blockEditor.InspectorControls, {})), el("style", null, ".wp-block-jbn-accordion .wp-block-jbn-accordion-content:not(:last-child){ border-bottom: 1px Dashed rgba(0,0,0,0.2) };"), el("div", blockProps, el(wp.blockEditor.InnerBlocks, {
                allowedBlocks: [ "jbn/accordion-content" ],
                template: template
            })) ];
        },
        save: function(props) {
            var blockProps = useBlockProps.save();
            return [ el("div", blockProps, el(wp.blockEditor.InnerBlocks.Content)) ];
        }
    });
})(window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.components, window.wp.blockEditor);