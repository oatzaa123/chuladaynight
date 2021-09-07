<template>
    <div class="section-7">
        <div class="img">
            <img
                :src="require('@/assets/images/home/section7/Group 795.svg')"
            />
        </div>
        <div class="text">
            <div>Tell us what</div>
            <div>you think</div>
        </div>
        <div class="button">
            <button class="btn" @click="link">แสดงความคิดเห็น</button>
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
    }
}

@media screen and (max-width: 768px) {
    .section-7 {
        .text {
            font-size: 30px;
            margin-right: 25px;
        }
    }
}
</style>
