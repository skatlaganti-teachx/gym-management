from fastapi import FastAPI
from server.controllers import add_member, view_members, update_fee_status, record_attendance, view_attendance, delete_all
from server.models import MemberRequest

app = FastAPI()

@app.post("/add_member")
async def add_member_route(request: MemberRequest):
    return await add_member(request)

@app.get("/members")
async def view_members_route():
    return await view_members()

@app.post("/update_fee_status")
async def update_fee_status_route(request: MemberRequest):
    return await update_fee_status(request)

@app.post("/record_attendance")
async def record_attendance_route(request: MemberRequest):
    return await record_attendance(request)

@app.get("/attendance")
async def view_attendance_route():
    return await view_attendance()

@app.delete("/delete_all")
async def delete_all_route():
    return await delete_all()