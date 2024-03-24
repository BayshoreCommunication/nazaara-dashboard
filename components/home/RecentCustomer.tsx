import React from "react";
import Image from "next/image";
import { UserData } from "@/types/userTypes";
import { fetchServerSideData } from "../ServerSideDataFetching";

const RecentCustomer = async () => {
  const url = `${process.env.API_URL}/api/v1/user?limit=5&userType=user`;
  const userData: { data: UserData[] } = await fetchServerSideData(url);

  return (
    <>
      {userData && userData?.data?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Info</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {userData?.data?.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-8 h-8">
                          {user?.imageUrl && (
                            <Image
                              src={user.imageUrl}
                              width={80}
                              height={80}
                              alt="User Image"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="flex items-center justify-center w-full h-full">
          No Recent Customer Found!
        </p>
      )}
    </>
  );
};

export default RecentCustomer;
