<template>
  <div class="footer">
    <div class="overlay"></div>
    <img
      class="footer-bg"
      :src="require('../../assets/images/home/footer/Group 1062@2x.png')"
    />
    <div class="content">
      <div class="vego-group">
        <div class="vego">
          <div class="vego-main">VEGO</div>
          <div class="vego-flip">VEGO</div>
        </div>
        <div class="description">
          <p>
            {{ $t("footer_description1") }} <br />
            {{ $t("footer_description2") }} <br />
            {{ $t("footer_description3") }}
          </p>
          <div class="button">
            <button
              type="button"
              class="btn customButton"
              @click="
                openUrl(
                  'https://play.google.com/store/apps/details?id=th.co.gridwhiz.chulaartpark'
                )
              "
            >
              <img
                :src="require('@/assets/images/icons/Apple_logo_black.svg.png')"
                width="20"
              />
              <b>App Store</b>
            </button>
            <button
              type="button"
              class="btn customButton"
              @click="
                openUrl(
                  'https://apps.apple.com/nl/app/chula-art-park/id1600194621'
                )
              "
            >
              <img
                :src="require('@/assets/images/icons/Image 59.png')"
                width="20"
              />
              <b>Google play</b>
            </button>
          </div>
        </div>
        <!-- <div class="socials">
                    <div></div>
                    <div></div>
                </div> -->
      </div>
      <FooterContacts />
    </div>
  </div>
</template>

<script>
import FooterContacts from "./footer-contact";
export default {
  components: {
    FooterContacts,
  },
  setup() {
    const openUrl = (url) => {
      window.open(url, "_blank");
    };
    return { openUrl };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  background-image: url("../../assets/images/home/footer/Group 1062@2x.png");
  //   background-size: 100%;
  //   background-position: top;
  //   background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #030124;
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
    // margin-top: 250px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    color: white;
    width: 100%;
    .vego-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      /* transform: translateX(-10%); */
      line-height: 0.8;
      flex-wrap: nowrap;
      .vego {
        display: flex;
        flex-direction: column;
        margin-right: 15px;
        .vego-main {
          font-size: 100px;
          font-family: "Kanit-Black";
          text-shadow: 0 0 12px #b51bff;
        }
        .vego-flip {
          font-size: 100px;
          font-family: "Kanit-Black";
          transform: scaleY(-1);
          background: -webkit-linear-gradient(to top, #ffffff4d, #00000000 55%);
          background: -moz-linear-gradient(to top, #ffffff4d, #00000000 55%);
          background: linear-gradient(to top, #ffffff4d, #00000000 55%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .description {
      font-family: "Prompt-Regular";
      padding: 15px;
      line-height: 1;
      margin-right: 15px;
      div.button {
        display: flex;
      }
      .customButton {
        font-family: "Kanit-SemiBold";
        color: #fff;
        background-color: #000;
        font-size: 18px;
        border-radius: 20px;
        // width: 200px;
        border: 2px solid #000;
        margin-right: 5px;
        display: flex;
        &:hover {
          background-color: #fff;
          color: #000;
          img:nth-child(1) {
            filter: brightness(0);
          }
        }
        b {
          padding: 0px 20px;
        }
      }
    }
    .socials {
      display: flex;
      div {
        width: 100px;
        height: 100px;
        background-color: #fff;
        &:nth-child(1) {
          margin-right: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .footer-bg {
      display: none;
    }
    .content {
      position: relative;
      padding-top: 250px;
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
          img {
            width: calc(20px * 0.5);
          }
        }
      }
    }
  }
  @media screen and (max-width: 426px) {
    .footer-bg {
      display: none;
    }
    .content {
      position: relative;
      padding-top: 250px;
      .vego-group {
        flex-direction: column;
        align-items: center;
        transform: translateX(0%);
        .vego {
          .vego-main,
          .vego-flip {
            font-size: calc(200px * 0.5);
          }
        }
        .description {
          margin-right: 0px;
          p {
            font-size: calc(30px * 0.5);
          }
          div.button {
            text-align: center;
            .customButton {
              font-size: calc(30px * 0.5);
              img {
                width: calc(30px * 0.5);
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 321px) {
    .footer-bg {
      display: none;
    }
    .content {
      position: relative;
      padding-top: 250px;
      .vego-group {
        flex-direction: column;
        align-items: center;
        transform: translateX(0%);
        .vego {
          .vego-main,
          .vego-flip {
            font-size: calc(160px * 0.5);
          }
        }
        .description {
          margin-right: 0px;
          p {
            font-size: calc(28px * 0.5);
          }
          div.button {
            text-align: center;
            .customButton {
              font-size: calc(20px * 0.5);
              img {
                width: calc(20px * 0.5);
              }
            }
          }
        }
      }
    }
  }
}
</style>
