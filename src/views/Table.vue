<template>
  <div class="listbox">
    <div v-for="li in list" :key="li.toolCode">
      <h3>{{li.toolName}}</h3>
      <ul>
        <li 
          v-for="item in li.minitoolInfoRespList" 
          :key="item.toolCode" 
          :class='{active: actTag === item.toolCode}'
          @click='toggle(item.toolCode)'
        >
          <img :src='item.iconPic' />
          <span>{{item.toolName}}</span>
        </li>
      </ul>
    </div>

    <p>{{`${name}: ${age}`}}</p>
    <button @click="addnum()">click me</button> <br /><br />
    <button @click="fixNum()">click me</button>
  </div>
</template>

<script>
import { mapState,  mapMutations, mapActions } from 'vuex'
export default {
  name: 'list',
  created() {
    this.getList();
  },
  computed: mapState(['name', 'age', 'list', 'actTag']),
  methods: {
    ...mapMutations(['increment', 'toggleLi']),
    ...mapActions(['getList' ]),
    addnum(){
      this.getList();
    },
    fixNum(){
      this.increment(2)
    },
    toggle(num){
      this.toggleLi(num)
    }
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.listbox{
  ul{padding: 0;}
  li{list-style: none;}
  padding: 0 20px 20px;
  color:#38395B;

  h3{
    color:#38395B;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
  }
  ul{
    padding: 20px 0;
    display: grid;
    grid-gap: 30px 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fit, 1fr);

    li{
      text-align: center;

      img{
        width: 36px;
        border-radius: 20px;
        background: #f9f9f0;
        transition: all .4s ease .2s;
      }
      span{
        display: block;
        padding-top: 3px;
        font-size: 14px;
      }

      &.active{
        img{
          transform: rotateY(180deg);
        }
      }
    }
  }
}
</style>
