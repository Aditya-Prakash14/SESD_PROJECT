import { UserModel, IUser } from "../models/user.model";

export class UserRepository {
    async create(data: Partial<IUser>) {
        return UserModel.create(data);
    }

    async findByEmail(email: string) {
        return UserModel.findOne({ email });
    }

    async findById(id: string) {
        return UserModel.findById(id).select("-password");
    }

    async findAll() {
        return UserModel.find().select("-password");
    }

    async update(id: string, data: Partial<IUser>) {
        return UserModel.findByIdAndUpdate(id, data, { new: true }).select("-password");
    }

    async delete(id: string) {
        return UserModel.findByIdAndDelete(id);
    }
}
