import FormCollection from './FormCollection';

class Form extends Object {
  constructor(props) {
    super(...props);
    this.id = props.id;
    this.name = props.name;
    this.formBody = props.formBody;
    this.created = props.created;
    this.updated = props.updated;
  }

  create = async () => {
    try {
      let formCollection = await new FormCollection().init();
      await formCollection.add(this);
      await formCollection.save();
    } catch (err) {
      console.log(err);
    }
  };

  get = async id => {
    try {
      const formCollection = await new FormCollection().init();
      // this will return an array of one. need to return just the object.
      const form = formCollection.filter(x => x.id === id);
      return form;
    } catch (err) {
      console.log(err);
    }
  };

  update = async () => {
    try {
      let formCollection = await new FormCollection().init();
      await formCollection.replace(this);
      await formCollection.save();
    } catch (err) {
      console.log(err);
    }
  };

  delete = async id => {
    try {
      let formCollection = await new FormCollection().init();
      await formCollection.remove(id);
      await formCollection.save();
    } catch (err) {
      console.log(err);
    }
  };
}

export default Form;
