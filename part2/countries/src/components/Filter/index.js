import React from 'react'

export const Filter = ({ filter, onChange }) => (
  <>
    <table>
      <tbody>
        <tr>
          <td>filter shown with </td>
          <td>
            <input
              name="filter"
              value={filter}
              onChange={onChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </>
)
