<template>
    <div class="main-gallery-id">
        <div class="left-arrow">
            <button class="btn btn-light customButton">
                <div class="arrow-left"></div>
                <div class="left"></div>
            </button>
        </div>
        <div class="right-arrow"></div>
        <div class="container">
            <div class="sub-gallery"></div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {},
}
</script>

<style lang="scss">
.default {
    background-image: url('../../assets/images/gallery/BACKGROUND.svg') !important;
}
.main-gallery-id {
    position: relative;
    .left-arrow {
        position: fixed;
        left: 2%;
        top: 50%;
        .customButton {
            background-color: #7948e6;
            color: #ffffff;
            border-radius: 100%;
            border: none;
            position: relative;
            width: 48px;
            height: 48px;
            .arrow-left {
                border: solid white;
                width: 28px;
                position: absolute;
                border-width: 0 3px 3px 0;
                // display: inline-block;
                padding: 3px;
            }
            .left {
                border: solid white;
                position: absolute;
                border-width: 0 3px 3px 0;
                // display: inline-block;
                padding: 3px;
                transform: rotate(135deg);
                -webkit-transform: rotate(135deg);
            }
        }
    }
    .right-arrow {
        right: 10%;
    }
}
</style>
