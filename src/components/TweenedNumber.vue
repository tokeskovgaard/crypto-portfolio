<template>
    <span class="tweened-number">{{ formattedTweeningValue }}</span>
</template>

<script lang="ts">
    // import * as TWEEN from '@tweenjs/tween.js'
    import { Component, Vue } from 'vue-property-decorator';
    import {Prop, Watch} from "vue-property-decorator";

    @Component({
        props: {
            // The value that we'll be tweening to.

        },
    })
    export default class TweenedNumber extends Vue {
        tweeningValue = '0';
        @Prop(Number) readonly value: number | undefined;
        @Prop({default: 500,type: Number}) readonly tweenDuration: number | undefined;
        @Prop({default: 2,type: Number}) readonly decimals: number | undefined;


        get formattedTweeningValue() {
            return Number(parseFloat(this.tweeningValue).toFixed(2)).toLocaleString(undefined, {minimumFractionDigits: this.decimals});
        }

        mounted() {
            this.tween(0, this.value);
        }

        @Watch('value')
        onValueChanged(newVal: any, oldVal: any) {
            this.tween(oldVal, newVal);
        }

        // This is our main logic block. It handles tweening from a start value to an end value.
        tween(start: any, end: any) {
            // let vm = this;
            // let frameHandler: any;
            //
            // const animate = function (currentTime: any) {
            //     TWEEN.update(currentTime);
            //     frameHandler = requestAnimationFrame(animate);
            // };
            //
            // let oldValue = parseFloat(start) || 0;
            // let newValue = parseFloat(end) || 0;
            // new TWEEN.Tween({tweeningNumber: oldValue})
            //     .easing(TWEEN.Easing.Quadratic.Out)
            //     .to({tweeningNumber: newValue}, vm.tweenDuration)
            //     .onUpdate(function () {
            //         // vm.tweeningValue = this.tweeningNumber;
            //     })
            //     .onComplete(() => {
            //         cancelAnimationFrame(frameHandler);
            //     })
            //     .start();
            //
            // frameHandler = requestAnimationFrame(animate);
        }
    }
</script>
