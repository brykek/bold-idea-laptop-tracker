import { http } from "../http-common";

class LaptopDataService {
    getAllLaptops() {
        return http.get("/inventory");
    }

    getLaptop(id) {
        return http.get(`/inventory/${id}`);
    }

    createLaptop() {
        return http.post('/create');
    }

    updateLaptop() {
        return http.put('/update');
    }
}