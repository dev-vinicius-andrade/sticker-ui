export default{
    methods:{
        async defaultInitializer(){
            if(this.value!==null && this.value!==undefined)
              if(Object.hasOwn(this, 'data'))
                this.data=this.value
        },
    }
}