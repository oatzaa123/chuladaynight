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
                        พบกับประสบการณ์ใหม่ในการรับชม <br />
                        Chula digital day & night ในรูปแบบ AR <br />
                        และ VR ผ่านแอปพลิเคชันบนมือถือได้เร็วๆนี้
                    </p>
                    <div class="button">
                        <button type="button" class="btn customButton">
                            <b>Let's Go</b>
                        </button>
                    </div>
                </div>
            </div>

            <div class="contact">
                <div class="contact-group">
                    <div class="box-1">
                        <div>GridWhiz (Thailand) Co. Ltd. (Headquarters)</div>
                        <div>
                            184/185 Forum Tower 28th Fl. Ratchadapisek Rd.
                        </div>
                        <div>Huai Khwang, Bangkok 10310</div>
                    </div>
                    <div class="box-2">
                        <div>Tel: +66 2061 9519 Fax: +66 2061 9519</div>
                        <div>Hot-line Support Tel: +66 8 3777 8822</div>
                    </div>
                    <div class="box-3">
                        <div v-for="(item, index) in icon" :key="index">
                            <img
                                class="contact-icon"
                                :src="item.path"
                                width="40"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const icon = ref([
            {
                path: require('@/assets/images/icons/Group 327@2x.png'),
            },
            {
                path: require('@/assets/images/icons/Group 344@2x.png'),
            },
            {
                path: require('@/assets/images/icons/Group 328.svg'),
            },
        ])

        return { icon }
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
        background: linear-gradient(
            359deg,
            #030024,
            rgba(0, 0, 0, 0.7),
            transparent
        );
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
            }
        }
        .contact {
            .contact-group {
                margin: 50px 50px 100px;
                padding: 15px;
                border-top: 1px solid;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                .box-1,
                .box-2 {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }
                .box-2 {
                    text-align: center;
                }
                .box-3 {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    justify-content: flex-end;
                    img {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
