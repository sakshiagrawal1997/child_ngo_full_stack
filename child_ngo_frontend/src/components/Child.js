import React from 'react'

function Child() {
    return (
        <div className="table table-striped table-sm">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Sex</th>
      <th scope="col">Date of Birth</th>
      <th scope="col">Father's Name</th>
      <th scope="col">Mother's Name</th>
      <th scope="col">State Name</th>
      <th scope="col">District Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
        </div>
    )
}

export default Child
