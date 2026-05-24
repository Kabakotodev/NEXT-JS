import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
 Select,
 SelectTrigger,
 SelectContent,
 SelectItem,
 SelectValue
} from "@/components/ui/select"

export default function CrudForm({
 fields,
 formData,
 setFormData
}:any){

 return(

 <div className="space-y-4">

 {fields.map((field:any)=>{

 if(field.type==="textarea"){

 return(

 <Textarea
 key={field.name}
 placeholder={field.label}
 value={formData[field.name] || ""}
 onChange={(e)=>
 setFormData({...formData,[field.name]:e.target.value})
 }
 />

 )

 }

 if(field.type==="select"){

 return(

 <Select
 key={field.name}
 value={formData[field.name]}
 onValueChange={(v)=>
 setFormData({...formData,[field.name]:v})
 }
 >

 <SelectTrigger>
 <SelectValue placeholder={field.label}/>
 </SelectTrigger>

 <SelectContent>

 {field.options?.map((opt:any)=>(
 <SelectItem key={opt.value} value={String(opt.value)}>
 {opt.label}
 </SelectItem>
 ))}

 </SelectContent>

 </Select>

 )

 }

 return(

 <Input
 key={field.name}
 placeholder={field.label}
 value={formData[field.name] || ""}
 onChange={(e)=>
 setFormData({...formData,[field.name]:e.target.value})
 }
 />

 )

 })}

 </div>

 )

}