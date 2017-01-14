import Request from './request';

class TagService {
  get() {
    const request = new Request();
    return request.get('tags');  
  }

};

export default TagService;
export { TagService };
