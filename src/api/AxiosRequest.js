import { AxiosInstance } from './AxiosInstance';

const fetchQuestions = async (tag, page) => {
	try {
		let response = await AxiosInstance().get(
			`/2.3/questions?page=1&pagesize=8&order=desc&sort=hot&tagged=react&site=stackoverflow`
		);

		return response;
	} catch (err) {
		if (err.response) {
			console.log('responseError', err.response.data);
			return err.response;
		} else if (err.request) {
			console.log('requestError', err.request);
			return err.request;
		} else {
			console.log('Error', err.message);
			return err.message;
		}
	}
};
export default { fetchQuestions };
