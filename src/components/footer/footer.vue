<template>
    <div class="footer">
        <div class="overlay"></div>
        <img
            class="footer-bg"
            :src="require('../../assets/images/home/footer/ve.png')"
        />
        <div class="content">
            <div class="vego-group">
                <div class="vego">
                    <div class="vego-main">VEGO</div>
                    <div class="vego-flip">VEGO</div>
                </div>
                <div class="description">
                    <p>
                        {{ $t('footer_description1') }} <br />
                        {{ $t('footer_description2') }} <br />
                        {{ $t('footer_description3') }}
                    </p>
                    <div class="button">
                        <button type="button" class="btn customButton">
                            <b>Let's Go</b>
                        </button>
                    </div>
                </div>
            </div>
            <FooterContacts />
        </div>
    </div>
</template>

<script>
import FooterContacts from './footer-contact'
export default {
    components: {
        FooterContacts,
    },
}
</script>

<style lang="scss" scoped>
.footer {
    position: relative;
    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(359deg, #030024 20%, rgba(0, 0, 0, 0));
        z-index: 2;
    }
    .footer-bg {
        width: 100%;
        z-index: 1;
    }
    .content {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        color: white;
        width: 100%;
        .vego-group {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            transform: translateX(-10%);
            line-height: 0.8;
            flex-wrap: nowrap;
            .vego {
                display: flex;
                flex-direction: column;
                .vego-main {
                    font-size: 100px;
                    font-family: 'Kanit-Black';
                    text-shadow: 0 0 12px #b51bff;
                }
                .vego-flip {
                    font-size: 100px;
                    font-family: 'Kanit-Black';
                    transform: scaleY(-1);
                    background: -webkit-linear-gradient(
                        to top,
                        #ffffff4d,
                        #00000000 55%
                    );
                    background: -moz-linear-gradient(
                        to top,
                        #ffffff4d,
                        #00000000 55%
                    );
                    background: linear-gradient(
                        to top,
                        #ffffff4d,
                        #00000000 55%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }
        .description {
            font-family: 'Kanit-Light';
            padding: 15px;
            line-height: 1;
            .customButton {
                font-family: 'Kanit-Medium';
                color: #6268e9;
                font-size: 18px;
                border-radius: 20px;
                width: 200px;
                border: 2px solid #6268e9;
                &:hover {
                    background-color: #6268e9;
                    color: #fff;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .content {
            .vego-group .vego {
                .vego-main,
                .vego-flip {
                    font-size: calc(100px * 0.5);
                }
            }
            .description {
                p {
                    font-size: calc(18px * 0.5);
                }
                .customButton {
                    font-size: calc(18px * 0.5);
                }
            }
        }
    }
}
</style>
