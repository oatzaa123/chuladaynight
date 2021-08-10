<template>
    <div class="main-gallery-id">
        <div class="left-arrow">
            <button class="btn btn-light customButton">
                <div class="arrow"></div>
                <div class="left"></div>
            </button>
        </div>
        <div class="right-arrow">
            <button class="btn btn-light customButton">
                <div class="arrow"></div>
                <div class="right"></div>
            </button>
        </div>
        <div class="container">
            <div class="title-sub-gallery">
                <div class="text-title">
                    <p>CHULA FAHMAI</p>
                    <div class="d-flex mb-auto">
                        <div class="live">
                            <span class="dotted"></span>
                            <span>BOARDCAST</span>
                            <span>&nbsp; WATCH NOW</span>
                        </div>
                        <img
                            :src="
                                require('../../assets/images/gallery/Group 128.svg')
                            "
                            width="30"
                        />
                    </div>
                </div>
                <div class="sub-text">
                    <p>
                        <img
                            :src="require('../../assets/images/icons/user.png')"
                            width="20"
                            class="hover-img"
                        />
                        POOM JAI ARTIST
                    </p>
                    <p>POOM JAI ART GROUP</p>
                </div>
            </div>
            <div class="content-sub-gallery">
                <img
                    :src="require('../../assets/images/gallery/Image 44.svg')"
                />
            </div>
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
    background-image: url('../../assets/images/gallery/Image 44.svg') !important;
    // background-repeat: no-repeat !important;
    // background-size: 100% !important;
    // background-position: center !important;
    // backdrop-filter: blur(14px) !important;
    // -webkit-backdrop-filter: blur(14px) !important;
}
.main-gallery-id {
    .container {
        background-image: url('../../assets/images/gallery/BACKGROUND.svg') !important;
        padding-top: var(--bs-gutter-x, 2rem);
        min-height: 100vh;
        .title-sub-gallery {
            .text-title {
                display: flex;
                justify-content: space-between;
                margin-right: 25px;
                text-align: left;
                font-size: 12px;
                p:nth-child(1) {
                    color: #ffffff;
                    font-size: 32px;
                    font-weight: bold;
                }
                img {
                    margin-left: 10px;
                    filter: invert(24%) sepia(50%) saturate(4728%)
                        hue-rotate(280deg) brightness(111%) contrast(119%);
                }
                .live {
                    border: 1px solid white;
                    padding: 0.375rem 0.75rem;
                    border-radius: 50px;
                    margin-bottom: auto;
                    span:nth-child(2) {
                        color: #e17cff;
                    }
                    span:nth-child(3) {
                        color: #ffffff;
                    }
                    .dotted {
                        height: 10px;
                        width: 10px;
                        background-color: #f61bff;
                        border-radius: 50%;
                        display: inline-block;
                        border: 1px solid white;
                        margin-right: 5px;
                    }
                }
            }
            .sub-text {
                display: flex;
                justify-content: left;
                align-items: center;
                p:nth-child(1) {
                    margin-right: 25px;
                    color: #ba1bff;
                }
                p:nth-child(2) {
                    color: #ffffff;
                }
            }
            .hover-img {
                filter: invert(19%) sepia(87%) saturate(4315%)
                    hue-rotate(276deg) brightness(103%) contrast(108%);
            }
        }
        .content-sub-gallery {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    position: relative;
    .left-arrow {
        position: fixed;
        left: 2%;
        top: 50%;
    }
    .right-arrow {
        position: fixed;
        right: 2%;
        top: 50%;
    }
    .customButton {
        background-color: #7948e6;
        color: #ffffff;
        border-radius: 100%;
        border: none;
        position: relative;
        width: 48px;
        height: 48px;
        .arrow {
            border: 0.5px solid white;
            width: 28px;
            position: absolute;
        }
        .left {
            border: solid white;
            position: absolute;
            border-width: 0 2px 2px 0;
            padding: 4px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            top: 20px;
        }
        .right {
            border: solid white;
            position: absolute;
            border-width: 2px 0px 0px 2px;
            padding: 4px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            top: 20px;
            right: 20%;
        }
    }
}
</style>
