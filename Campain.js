


function Campain(name,campain_audio,budget,PPS,PPFL){
  ///////crutial params:
  this.id;
  this.Name = name;
  this.Active=true;
  this.Audio=campain_audio;
  this.Budget=budget;
  this.Pay_Per_Second=PPS;
  this.Pay_Per_Full_Listen = PPFL;//validate: PPS*Audio.Lenght < PPFL

  this.optional_params={
         pricing_params:{
           
           Extra_Deatles:{
             
           },
           Deal:{
             
           }
         },
    
         target_params:{
         
           target_gender:'',
           terget_age:'',
           target_erea:''
           
               //etc
               // current speed (driving/walking)
         },
    
         global_params:{
         
           Time:{
               
           },
           Whether:{
               
           }
           //etc
                 
        }
    };
}