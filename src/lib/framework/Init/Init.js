import Model from '../Model';

export default class Init extends Model {
  constructor(init) {
    super({
      model: 'Init',
      driver: 'local',
      schema: {
        id: ['string', init.id],
        text: ['string', init.text]
      }
    });
  }
}
