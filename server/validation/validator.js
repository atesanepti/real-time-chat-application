
const checkMethods = ()=>{
    const required = (value)=>{
        if(!value){
            return ""
        }
    }
}


const stringCheckHandler = (value)=>{

}

const objectCheckHandler = (value) => {};

export const apnaValidator = (body, validations) => {
  body = body || [];
  validations = validations || [];
  if (!body.length || !validations.length) return;

  validations.forEach((v) => {
    const fieldValue = body[v.field] || "";
    if(fieldValue){
        v.validateWith.forEach((c)=>{
            if(typeof c == "string"){
                stringCheckHandler(c);
            }
            else if(typeof c == "object"){
                objectCheckHandler(c);
            }
        });
    }
  });
};
