import {defineAbilityFor} from "@saas/auth"

const ability = defineAbilityFor({role: "ADMIN", id: "1"})

console.log(ability.can("manage", "Organization"))

console.log(ability.can("manage", "Project"))

console.log(ability.can("manage", "User"))

console.log(ability.can("manage", "Invite"))

console.log(ability.can("manage", "Billing"))

