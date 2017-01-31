#Changelog

##v1.0.0 (17/01/2017)
**Implementing talent composition with stateless talents and explicit conflict resolution between talents.**

##v1.0.1 (17/01/2017)
**Updating readme**

##v1.0.2 (19/01/2017)
**Updating readme**

##v1.0.4 (23/01/2017)
**Making possible to use talents which were created by an other installment of the package.**

##v1.0.5 (24/01/2017)
**Going back to proper type check for talents.** If using a talent created by an other installment of the package is necessary I recommend to recreate the talent using the Talent constructor. Like: `const copiedTalent = new Talent(talent)`

##v1.1.0 (31/01/2017)
**Making possible to declare a required member on the prototype of a class**