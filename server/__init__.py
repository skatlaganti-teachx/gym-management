from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.controllers import add_member, view_members, update_fee_status, record_attendance, view_attendance, delete_all
from server.models import MemberRequest, MemberResponse, AttendanceResponse, AttendanceRequest, FeeStatusRequest, BaseResponse

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/add_member")
async def add_member_route(request: MemberRequest) -> BaseResponse:
    return await add_member(request)

@app.get("/members")
async def view_members_route() -> list[MemberResponse]:
    return await view_members()

@app.post("/update_fee_status")
async def update_fee_status_route(request: FeeStatusRequest) -> BaseResponse:
    return await update_fee_status(request)

@app.post("/record_attendance")
async def record_attendance_route(request: AttendanceRequest) -> BaseResponse:
    return await record_attendance(request)

@app.get("/attendance")
async def view_attendance_route() -> list[AttendanceResponse]:
    return await view_attendance()

@app.delete("/delete_all")
async def delete_all_route() -> BaseResponse:
    return await delete_all()