from flask import Flask
from server.controllers import add_member, view_members, update_fee_status, record_attendance, view_attendance, delete_all

app = Flask(__name__)

@app.route("/add_member", methods=["POST"])
def add_member_route():
    return add_member()

@app.route("/members", methods=["GET"])
def view_members_route():
    return view_members()

@app.route("/update_fee_status", methods=["POST"])
def update_fee_status_route():
    return update_fee_status()

@app.route("/record_attendance", methods=["POST"])
def record_attendance_route():
    return record_attendance()

@app.route("/attendance", methods=["GET"])
def view_attendance_route():
    return view_attendance()

@app.route("/delete_all", methods=["DELETE"])
def delete_all_route():
    return delete_all()