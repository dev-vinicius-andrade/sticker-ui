export default{
    methods: {
        async baseInitializer(setupContext=true){
            if(this.value!==null && this.value!==undefined)
              if(Object.hasOwn(this, 'data'))
               { 
                this.data=this.value
                if(setupContext)
                  await this.setupContext();
              }
          },
          emitCreated(){
            this.emit("created", this);
          },
          emitMounted(){
            this.emit("mounted", this);
          },
          emitInput(){
            this.$emit('input',this.data)
          },
          emitEvent(type, data){
            this.$emit("event",type,data);
          },
          emit(type, data){
            this.emitEvent(type, data);
            this.$emit(type,data);
          }
    },
}