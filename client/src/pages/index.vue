<template>
  <div>
    <h1>title</h1>
    <router-link to="1">
      first
    </router-link>
    <router-link to="2">
      second
    </router-link>
    {{ msg }}
    <router-view />
  </div>
</template>
<style>
    body{
        background-color:#66ccff;
    }
</style>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import {Prop} from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  @Prop({default: 'hello vue'}) msg: string
}
</script>
