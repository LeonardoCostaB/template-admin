export default class Client {
   constructor(
      private id: string = '',
      private name: string = '',
      private initalDate: string = '',
      private deliveryDate: string = '',
      private cash: number = 0,
   ) {}

   get _id() {
      return this.id;
   }

   get _name() {
      return this.name;
   }

   get _initialDate() {
      return this.initalDate;
   }

   get _deliveryDate() {
      return this.deliveryDate;
   }

   get _cash() {
      return this.cash;
   }
}
