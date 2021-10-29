<template>
    <div class="section-7">
        <div class="img">
            <img
                :src="require('@/assets/images/home/section7/Group 795.svg')"
            />
        </div>
        <div class="text">
            <div>{{ $t('section7') }}</div>
            <div>{{ $t('section7_2') }}</div>
        </div>
        <div class="button">
            <button class="btn" @click="link">{{ $t('section7_btn') }}</button>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        const link = () => {
            window.open('https://www.google.com')
        }

        return {
            link,
        }
    },
}
</script>
<style lang="scss">
.section-7 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 70px;
    background-color: #030124;
    color: #fff;
    .img {
        margin-right: 25px;
    }
    .text {
        font-size: 50px;
        line-height: 1;
        font-family: 'Kanit-SemiBold';
        margin-right: 70px;
    }
    .button .btn {
        color: #fff;
        font-family: 'Prompt-Bold';
        font-size: 22px;
        background-color: #7948e6;
        padding: 15px 20px;
        border-radius: 32px;
        &:hover {
            color: #7948e6;
            background-color: #fff;
        }
    }
}

@media screen and (max-width: 768px) {
    .section-7 {
        .text {
            font-size: 25px;
            margin-right: 25px;
        }
        .button .btn {
            color: #fff;
            font-family: 'Prompt-Bold';
            font-size: 20px;
            background-color: #7948e6;
            padding: 15px 20px;
            border-radius: 32px;
            &:hover {
                color: #7948e6;
                background-color: #fff;
            }
        }
    }
}

@media screen and (max-width: 426px) {
    .section-7 {
        display: block;
        padding: 20px 10px;
        .img {
            margin-right: 15px;
            img {
                width: 170px;
            }
        }
        .text {
            font-size: 45px;
            margin-right: 0px;
        }
        .button .btn {
            margin: 20px 0px;
            color: #fff;
            font-family: 'Prompt-Bold';
            font-size: 22px;
            background-color: #7948e6;
            padding: 7px 15px;
            border-radius: 32px;
            &:hover {
                color: #7948e6;
                background-color: #fff;
            }
        }
    }
}

@media screen and (max-width: 320px) {
    .section-7 {
        padding: 40px;
    }
}
</style>
