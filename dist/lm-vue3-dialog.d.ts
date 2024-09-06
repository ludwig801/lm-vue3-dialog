import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:open": (isOpen: boolean) => any;
"open:begin": () => any;
"open:end": () => any;
"close:begin": () => any;
"close:end": () => any;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
"onUpdate:open"?: ((isOpen: boolean) => any) | undefined;
"onOpen:begin"?: (() => any) | undefined;
"onOpen:end"?: (() => any) | undefined;
"onClose:begin"?: (() => any) | undefined;
"onClose:end"?: (() => any) | undefined;
}>, {
width: string;
maxWidth: string;
animationTime: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare type __VLS_PublicProps = {
    "open": boolean;
} & typeof __VLS_typeProps;

declare function __VLS_template(): {
    default?(_: {}): any;
};

declare let __VLS_typeProps: LMDialogProps;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare const LMDialog: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;

export declare interface LMDialogProps {
    /**
     * Default CSS content width.
     *
     * @default "24rem"
     */
    width?: string;
    /**
     * Default CSS content max-width.
     *
     * @default "calc(100vw - 4rem)"
     */
    maxWidth?: string;
    /**
     * How many `ms` does show/hide animation take.
     * Setting this to `0` disables the animation
     *
     * @default 150
     */
    animationTime?: number;
    /**
     * The class attribute to apply to the backdrop element.
     *
     * @default ""
     */
    backdropClass?: string | object;
    /**
     * The class attribute to apply to the content element.
     */
    contentClass?: string | object;
}

export { }
