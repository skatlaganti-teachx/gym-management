from server.models import Member, Attendance, HTTPException, BadRequest, MemberRequest, FeeStatusRequest, AttendanceRequest

async def add_member(request: MemberRequest):
    try:
        if not all([request.name, request.membership_type, request.program]):
            raise BadRequest("Missing required fields: 'name', 'membership_type', 'program'.")

        member = Member(request.name, request.membership_type, request.program)
        member.save()

        return {"message": f"Member {request.name} added successfully"}

    except BadRequest as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

async def view_members():
    try:
        members = Member.all()

        return [{"id": idx + 1, "name": member.name, "membership_type": member.membership_type,
                 "program": member.program, "fee_status": member.fee_status} for idx, member in enumerate(members)]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

async def update_fee_status(request: FeeStatusRequest):
    try:
        members = Member.all()

        if request.member_id > len(members) or request.member_id <= 0:
            raise HTTPException(status_code=404, detail="Member not found.")
        request.member_id -= 1

        member = members[request.member_id]
        member.update_fee_status(request.fee_status)

        return {"message": f"Fee status updated for member ID {request.member_id}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

async def record_attendance(request: AttendanceRequest):
    try:
        if request.action not in ["in", "out"]:
            raise HTTPException(status_code=400, detail="Invalid action. Please use 'in' or 'out'.")

        members = Member.all()

        if request.member_id > len(members) or request.member_id <= 0:
            raise HTTPException(status_code=404, detail="Member not found.")
        request.member_id -= 1

        attendance = Attendance(request.member_id)

        if request.action == "in":
            attendance.record_check_in()
            return {"message": f"Check-in recorded for member ID {request.member_id}"}
        elif request.action == "out":
            attendance.record_check_out()
            return {"message": f"Check-out recorded for member ID {request.member_id}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

async def view_attendance():
    try:
        records = Attendance.all()

        return [{"member_id": record[0] + 1, "check_in_time": record[1], "check_out_time": record[2]}
                for record in records]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

async def delete_all():
    try:
        Member.delete_all()
        Attendance.delete_all()

        return {"message": "All data deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")