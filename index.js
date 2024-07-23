// lay du lieu danh sach sinh vien

async function getAllSinhVienApi() {
    try {
        let resolve = await axios({
            method: "GET",
            url: "https://svcy.myclass.vn/api/QuanLySinhVien/LayDanhSachSinhVien",
        });
        // console.log(resolve);
        document.getElementById("tableBody").innerHTML=renderDanhSachSinhVien(
            resolve.data
        );
        
        
    } catch (error) {
        // console.log(error);
        sloveError("có lỗi xảy ra")
        
    }


    
}

getAllSinhVienApi();

// lay thong tin sv tu ui
const layThongTinSinhVien=()=>{

    let arrField=document.querySelectorAll("#formQLSV input, #formQLSV select ");

    let sinhVien={};

    for (let field of arrField){
        
        let{id,value}=field;
        sinhVien[id]=value;
       
    }
    return sinhVien

}




  function sloveError(text,duration=3000){
    Toastify({
        text,
        duration,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

  }

  function renderDanhSachSinhVien(arr){
    let content="";
    for( let sinhVien of arr ){
        let{
            diemHoa,
            diemLy,
            diemToan,
            diemRenLuyen,
            maSinhVien,
            tenSinhVien,
            email,
            soDienThoai,
            loaiSinhVien,

        }=sinhVien

        let tong=(diemHoa+diemLy+diemToan+diemRenLuyen)/4;

        content+=`

        <tr>
        <td>${maSinhVien}</td>
        <td>${tenSinhVien}</td>
        <td>${email}</td>
        <td>${soDienThoai}</td>
        <td>${loaiSinhVien}</td>
        <td>${tong.toFixed(2)}</td>
        <td>
          <button class='btn btn-danger' onclick="deleteSinhVien(${sinhVien.maSinhVien})">Xoá</button>
          <button class='btn btn-warning' onclick="editSinhVien(${sinhVien.maSinhVien})">Sửa</button>
        </td>
        </tr>
        `;
    }
    return content;
  }

  //chuc nang lay du lieu va dua len csdl
  function addSinhVienApi(event){ 
    event.preventDefault();

    // let arrField=document.querySelectorAll("#formQLSV input, #formQLSV select ");

    // let sinhVien={};

    // for (let field of arrField){
        
    //     let{id,value}=field;
    //     sinhVien[id]=value;
       
    // }

    const sinhVien=layThongTinSinhVien();

    let promise= axios({
        method:"POST",
        url: " https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
        data: sinhVien,
    })

    promise.then((resolve)=>{
        // console.log(resolve);
        getAllSinhVienApi();

    }).catch((error)=>{
        // console.log(error);
        sloveError(error.response.data)
        
    });

  }
  document.getElementById("formQLSV").onsubmit=addSinhVienApi;













  //xoa sinh vien

  const deleteSinhVien= async (masv)=>{

    console.log("mssv: ",masv);
    try {
        // goi api xoa sinh vien

        const result = await axios({

            url: `https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${masv}`,
            method: "DELETE",
        })
        // console.log("result: ",result);

        //goi api de cap nhat danh sach sv mmoi nhat
        getAllSinhVienApi();
        
    } catch (error) {
        console.log(error);
        
    }
  };


  // chuc nang cap nhat sinh vien

  const editSinhVien= async (maSv)=>{

    // console.log("masv:", maSv)

    try {
        //goi api lay thong tin chi tiet sv
        const result = await axios({
            url: `https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSv}`,
            method: "GET",
        })
        //hien thi thong tin len form

        let arrField=document.querySelectorAll("#formQLSV input, #formQLSV select ");
        // console.log("arrfield",arrField);
        for(let field of arrField){
            const {id}=field;
            field.value=result.data[id];//khong hieu
           if(field.id==="maSinhVien"){
            field.readOnly = true; 
           }
           

            // console.log(result.data[id])


        }


        
    } catch (error) {
        console.log(error);
        
    }
  }

// chuc nang cap nhat sv
document.getElementById("btnCapNhat").onclick= async()=>{
    try {
        //lay thong tin sinh vien vua chinh sua
        const sinhVien=layThongTinSinhVien();
        // console.log("sinhVien",sinhVien);

        //goi api cap nhat thong tin sv

        const result= await axios({
            url:`https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sinhVien.maSinhVien}`,
            method:"PUT",
            data:sinhVien,
        });
        // console.log("result: ",result);

        // goi api lay danh sach sv moi nhat serve

        getAllSinhVienApi();

        
    } catch (error) {
        console.log("error",error)
        
    }

}




    
 