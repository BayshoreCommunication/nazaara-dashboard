'use client'
import React from 'react'
import { useGetContactsQuery } from '@/services/contactApi'
import Loader from '@/components/loader'
import { TbEdit } from 'react-icons/tb'
import { BiMailSend } from 'react-icons/bi'

export const GetAllContacts = () => {
  const { data: contactData, isLoading } = useGetContactsQuery()

  return isLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <tbody>
      {contactData?.data.map((data, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data?.email}</td>
            <td>{data?.message}</td>
            <td
              className={`${
                data?.status === 'pending'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}
            >
              {data?.status}
            </td>
            <td>
              <div className="flex">
                <label className="cursor-pointer" htmlFor="modal-handle">
                  <TbEdit color="green" size={20} />
                </label>
                <a href={`mailto:${data?.email}`}>
                  <BiMailSend size={20} color="#820000" />
                </a>
              </div>
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
