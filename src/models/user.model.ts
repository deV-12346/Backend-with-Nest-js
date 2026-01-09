import { Model } from "sequelize-typescript";
import { AllowNull, AutoIncrement, Column, DataType, Default, IsNull, PrimaryKey, Table, Unique } from "sequelize-typescript";

enum role_type  {
    user = "user",
    admin= "admin"
}
interface User{
    user_id?: number;
    username?: string;
    password?: string;
    mobile_number?: string;
    email?: string;
    coverimage?: string | null;
    avatar?: string | null ;
    otp?: number | null;
    otp_expiry?: Date | null;
    role: role_type
}
  @Table({
    tableName:"users",
    timestamps:true
  })
export class UserModel extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    user_id: number;

    @AllowNull(false)
    @Unique(true)
    @Column(DataType.STRING(50))
    username: string;

    @AllowNull(false)
    @Unique(true)
    @Column(DataType.STRING(50))
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING(15))
    mobile_number: string;

    @AllowNull(true)
    @Column(DataType.STRING(200))
    coverimage: string | null;

    @AllowNull(true)
    @Column(DataType.STRING(200))
    avatar: string | null;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    otp: number | null;

    @AllowNull(true)
    @Column(DataType.DATE)
    otp_expiry: Date | null;

    @Default(role_type.user)
    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(role_type)))
    role: string;
}