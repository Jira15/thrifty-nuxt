<script setup>  
import { useBannerStore } from '@/stores/banner'  
import { getAssetURL } from "@/utils/get-asset-url"; 
const storeBanner = useBannerStore();   
const imagenes = computed(() => {
    return storeBanner.imagenes
}) 
onMounted(() => {
    storeBanner.fetchBanners(); 
}) 
</script> 
<template>
<div> 
    <transition-group name="slide" tag="div">   

    <img
        v-for="banner in imagenes"
        :key="banner.id"
        :src="getAssetURL(banner.banner)" 
        class="slider-item"
        :style="{ transform: `translateX(-${index * 100}%)` }"
    />
    </transition-group>
</div>
</template>
 
<style>
    .slide-enter-active,
    .slide-leave-active {
    transition: transform 0.5s;
    }
    .slide-enter,
    .slide-leave-to {
    transform: translateX(100%);
    }
    .slider-item {
    width: 100%;
    height: 300px;
    object-fit: cover;
    }
</style> 
<!-- 

<template>
<div class="banner">
    <img src="../assets/images/banner_thrifty_2023.jpg"/> 
</div>
</template>

<style scoped>
    .banner{ 
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 240px;
    } 

    @media screen and (min-width: 768px) { 
        .banner{ 
            min-height:auto;
            background-size: cover;
            background-repeat: no-repeat;   
        }  
    }
    
</style> -->
