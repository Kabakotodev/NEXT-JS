import { z } from "zod";

export const serviceSchema = z.object({

  nomService: z.string().min(2,"Nom obligatoire"),
  sigleService: z.string().min(2,"Sigle obligatoire"),

  descService: z.string().optional(),

  contactService: z.string().optional(),
  adresseService: z.string().optional(),

  statutChefService: z.string().min(2,"Statut chef obligatoire"),
  nomChefService: z.string().min(2,"Nom chef obligatoire"),

  gradeChefService: z.string().min(2,"Grade obligatoire"),

  fonctionChefService: z.string().min(2,"Fonction obligatoire"),

  contactChefService: z.string().min(2,"Contact chef obligatoire"),

  serviceParentId: z.string().min(1,"Service parent obligatoire")

});

export type ServiceFormData = z.infer<typeof serviceSchema>;