from server.models import Member, Attendance
from flask import jsonify, request

class BadRequest(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def add_member():
    try:
        data = request.get_json()
        
        if not data or not all(field in data for field in ["name", "membership_type", "program"]):
            raise BadRequest("Missing required fields: 'name', 'membership_type', 'program'.")

        name = data["name"]
        membership_type = data["membership_type"]
        program = data["program"]

        member = Member(name, membership_type, program)
        member.save()

        return jsonify({"message": f"Member {name} added successfully"}), 201

    except BadRequest as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

def view_members():
    try:
        members = Member.all()

        return jsonify([{
            "id": idx + 1,
            "name": member.name,
            "membership_type": member.membership_type,
            "program": member.program,
            "fee_status": member.fee_status
        } for idx, member in enumerate(members)]), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

def update_fee_status():
    try:
        data = request.get_json()

        if not all(field in data for field in ["member_id", "fee_status"]):
            return jsonify({"error": "Missing required fields: 'member_id', 'fee_status'."}), 400

        member_id = data["member_id"]
        fee_status = data["fee_status"]

        members = Member.all()
        if member_id > len(members) or member_id <= 0:
            return jsonify({"error": "Member not found."}), 404

        member = members[member_id - 1]
        member.update_fee_status(fee_status)

        return jsonify({"message": f"Fee status updated for member ID {member_id}"}), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

def record_attendance():
    try:
        data = request.get_json()

        if not all(field in data for field in ["member_id", "action"]):
            return jsonify({"error": "Missing required fields: 'member_id', 'action'."}), 400

        member_id = data["member_id"]
        action = data["action"].lower()

        if action not in ["in", "out"]:
            return jsonify({"error": "Invalid action. Please use 'in' or 'out'."}), 400

        members = Member.all()
        if member_id > len(members) or member_id <= 0:
            return jsonify({"error": "Member not found."}), 404

        attendance = Attendance(member_id)

        if action == "in":
            attendance.record_check_in()
            return jsonify({"message": f"Check-in recorded for member ID {member_id}"}), 200
        elif action == "out":
            attendance.record_check_out()
            return jsonify({"message": f"Check-out recorded for member ID {member_id}"}), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

def view_attendance():
    try:
        records = Attendance.all()

        return jsonify([{
            "id": record[0],
            "member_name": record[1],
            "check_in_time": record[2],
            "check_out_time": record[3]
        } for record in records]), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

def delete_all():
    try:
        Member.delete_all()
        Attendance.delete_all()

        return jsonify({"message": "All data deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500