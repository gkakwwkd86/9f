import { useState, useMemo } from "react";

const ROOMS = [
  { id: 1, name: "9층 소회의실", capacity: 6, floor: "9F", color: "#3B6FE8", features: ["화이트보드", "TV", "전화"] },
];

const HOURS = Array.from({ length: 10 }, (_, i) => i + 9); // 9AM ~ 6PM

function formatDate(date) {
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
}

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

function getWeekDates(base) {
  const monday = new Date(base);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const WEEKDAY_LABELS = ["월", "화", "수", "목", "금"];

export default function App() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentWeekBase, setCurrentWeekBase] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [bookings, setBookings] = useState([
    { id: 1, roomId: 1, date: getDateKey(today), startHour: 10, endHour: 12, title: "주간 팀 미팅", organizer: "김민준" },
    { id: 2, roomId: 1, date: getDateKey(today), startHour: 14, endHour: 15, title: "1:1 면담", organizer: "이수연" },
  ]);

  const [modal, setModal] = useState(null); // { type: 'new'|'detail', ... }
  const [form, setForm] = useState({ title: "", organizer: "", startHour: 9, endHour: 10, roomId: null });
  const [nextId, setNextId] = useState(10);
  const [filterRoom, setFilterRoom] = useState(null);

  const weekDates = getWeekDates(currentWeekBase);

  const dateBookings = useMemo(() =>
    bookings.filter(b => b.date === getDateKey(selectedDate) && (!filterRoom || b.roomId === filterRoom)),
    [bookings, selectedDate, filterRoom]
  );

  function openNew(roomId, startHour) {
    setForm({ title: "", organizer: "", startHour, endHour: startHour + 1, roomId });
    setModal({ type: "new" });
  }

  function openDetail(booking) {
    setModal({ type: "detail", booking });
  }

  function handleBook() {
    if (!form.title.trim() || !form.organizer.trim()) return;
    if (form.endHour <= form.startHour) return;
    // Check conflict
    const conflict = bookings.some(b =>
      b.roomId === form.roomId && b.date === getDateKey(selectedDate) &&
      !(form.endHour <= b.startHour || form.startHour >= b.endHour)
    );
    if (conflict) {
      alert("해당 시간에 이미 예약이 있습니다.");
      return;
    }
    setBookings(prev => [...prev, {
      id: nextId, roomId: form.roomId, date: getDateKey(selectedDate),
      startHour: form.startHour, endHour: form.endHour,
      title: form.title, organizer: form.organizer
    }]);
    setNextId(n => n + 1);
    setModal(null);
  }

  function handleDelete(id) {
    setBookings(prev => prev.filter(b => b.id !== id));
    setModal(null);
  }

  const isToday = (d) => getDateKey(d) === getDateKey(today);
  const isSelected = (d) => getDateKey(d) === getDateKey(selectedDate);
  const isPast = (d) => d < today;

  function prevWeek() {
    const d = new Date(currentWeekBase);
    d.setDate(d.getDate() - 7);
    setCurrentWeekBase(d);
  }
  function nextWeek() {
    const d = new Date(currentWeekBase);
    d.setDate(d.getDate() + 7);
    setCurrentWeekBase(d);
  }

  const getRoomById = (id) => ROOMS.find(r => r.id === id);

  return (
    <div style={{ fontFamily: "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", background: "#F0F2F7", minHeight: "100vh", color: "#1A1D2E" }}>
      {/* Header */}
      <div style={{ background: "#1A1D2E", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#3B6FE8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 18 }}>🏢</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>회의실 예약</div>
            <div style={{ color: "#8892B0", fontSize: 11 }}>Meeting Room Booking</div>
          </div>
        </div>
        <div style={{ color: "#8892B0", fontSize: 13 }}>{formatDate(today)}</div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {/* Week nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <button onClick={prevWeek} style={navBtnStyle}>‹</button>
          <div style={{ display: "flex", gap: 6, flex: 1 }}>
            {weekDates.map((d, i) => {
              const hasBk = bookings.some(b => b.date === getDateKey(d));
              return (
                <button key={i} onClick={() => { setSelectedDate(d); setCurrentWeekBase(d); }}
                  style={{
                    flex: 1, padding: "10px 4px", borderRadius: 10, border: "none", cursor: isPast(d) ? "default" : "pointer",
                    background: isSelected(d) ? "#3B6FE8" : isToday(d) ? "#E8F0FF" : "#fff",
                    color: isSelected(d) ? "#fff" : isPast(d) ? "#B0B8CC" : "#1A1D2E",
                    fontWeight: isSelected(d) || isToday(d) ? 700 : 400,
                    boxShadow: isSelected(d) ? "0 4px 14px rgba(59,111,232,0.35)" : "0 1px 4px rgba(0,0,0,0.07)",
                    transition: "all 0.15s", position: "relative"
                  }}>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{WEEKDAY_LABELS[i]}</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{d.getDate()}</div>
                  {hasBk && <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, borderRadius: "50%", background: isSelected(d) ? "#fff" : "#3B6FE8" }} />}
                </button>
              );
            })}
          </div>
          <button onClick={nextWeek} style={navBtnStyle}>›</button>
        </div>

        {/* Room filter chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <FilterChip label="전체" active={!filterRoom} color="#3B6FE8" onClick={() => setFilterRoom(null)} />
          {ROOMS.map(r => (
            <FilterChip key={r.id} label={r.name.split(" ")[0]} active={filterRoom === r.id} color={r.color} onClick={() => setFilterRoom(filterRoom === r.id ? null : r.id)} />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>
          {/* Timeline grid */}
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #EDF0F7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>📅 {formatDate(selectedDate)}</span>
              <span style={{ fontSize: 12, color: "#8892B0" }}>{dateBookings.length}건 예약</span>
            </div>
            {/* Grid */}
            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: 640 }}>
                {/* Header row */}
                <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", borderBottom: "1px solid #EDF0F7" }}>
                  <div style={{ padding: "8px 0", textAlign: "center", fontSize: 11, color: "#B0B8CC" }}>시간</div>
                  {ROOMS.filter(r => !filterRoom || r.id === r.id).map(r => (
                    <div key={r.id} style={{ padding: "8px 6px", textAlign: "center", borderLeft: "1px solid #EDF0F7" }}>
                      <div style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: r.color, marginRight: 4 }} />
                      <span style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</span>
                      <div style={{ fontSize: 10, color: "#8892B0" }}>{r.floor} · {r.capacity}인</div>
                    </div>
                  ))}
                </div>
                {/* Hour rows */}
                {HOURS.map(hour => {
                  const isCurrentHour = new Date().getHours() === hour && isToday(selectedDate);
                  return (
                    <div key={hour} style={{ display: "grid", gridTemplateColumns: "60px 1fr", borderBottom: "1px solid #F5F7FB", background: isCurrentHour ? "#FAFBFF" : "transparent" }}>
                      <div style={{ padding: "10px 0", textAlign: "center", fontSize: 12, color: isCurrentHour ? "#3B6FE8" : "#B0B8CC", fontWeight: isCurrentHour ? 700 : 400 }}>
                        {hour}:00
                      </div>
                      {ROOMS.map(room => {
                        const booking = dateBookings.find(b => b.roomId === room.id && b.startHour <= hour && b.endHour > hour);
                        const bookingStart = booking && booking.startHour === hour;
                        const past = isPast(selectedDate) || (isToday(selectedDate) && hour < new Date().getHours());
                        if (booking && !bookingStart) return <div key={room.id} style={{ borderLeft: "1px solid #EDF0F7", background: `${room.color}18` }} />;
                        return (
                          <div key={room.id} style={{ borderLeft: "1px solid #EDF0F7", padding: "3px 4px", position: "relative" }}>
                            {booking ? (
                              <div onClick={() => openDetail(booking)}
                                style={{
                                  background: room.color, borderRadius: 6, padding: "5px 8px", cursor: "pointer",
                                  color: "#fff", fontSize: 11, fontWeight: 600,
                                  boxShadow: `0 2px 8px ${room.color}55`,
                                  minHeight: `${(booking.endHour - booking.startHour) * 40 - 8}px`
                                }}>
                                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{booking.title}</div>
                                <div style={{ opacity: 0.8, fontSize: 10 }}>{booking.startHour}:00 – {booking.endHour}:00</div>
                              </div>
                            ) : (
                              !past && (
                                <button onClick={() => openNew(room.id, hour)}
                                  style={{ width: "100%", minHeight: 36, background: "transparent", border: "1px dashed #E0E5EF", borderRadius: 6, cursor: "pointer", color: "#C0C8D8", fontSize: 11, transition: "all 0.12s" }}
                                  onMouseEnter={e => { e.target.style.background = `${room.color}15`; e.target.style.borderColor = room.color; e.target.style.color = room.color; }}
                                  onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "#E0E5EF"; e.target.style.color = "#C0C8D8"; }}>
                                  + 예약
                                </button>
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Room info cards */}
            {ROOMS.map(room => {
              const todayCount = bookings.filter(b => b.roomId === room.id && b.date === getDateKey(selectedDate)).length;
              return (
                <div key={room.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${room.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{room.name}</div>
                      <div style={{ fontSize: 11, color: "#8892B0", marginTop: 2 }}>{room.floor} · 최대 {room.capacity}인</div>
                    </div>
                    <div style={{ background: todayCount > 0 ? `${room.color}18` : "#F5F7FB", color: todayCount > 0 ? room.color : "#B0B8CC", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>
                      {todayCount}건
                    </div>
                  </div>
                  <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {room.features.map(f => (
                      <span key={f} style={{ fontSize: 10, background: "#F0F2F7", borderRadius: 4, padding: "2px 6px", color: "#6B7594" }}>{f}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,29,46,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}
          onClick={() => setModal(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
            onClick={e => e.stopPropagation()}>
            {modal.type === "new" ? (
              <>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>새 예약</div>
                <div style={{ fontSize: 13, color: "#8892B0", marginBottom: 20 }}>
                  {getRoomById(form.roomId)?.name} · {formatDate(selectedDate)}
                </div>
                <Label>회의 제목</Label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="예: 주간 팀 미팅" style={inputStyle} />
                <Label>주최자</Label>
                <input value={form.organizer} onChange={e => setForm(f => ({ ...f, organizer: e.target.value }))}
                  placeholder="이름 입력" style={inputStyle} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div>
                    <Label>시작 시간</Label>
                    <select value={form.startHour} onChange={e => setForm(f => ({ ...f, startHour: +e.target.value }))} style={inputStyle}>
                      {HOURS.map(h => <option key={h} value={h}>{h}:00</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>종료 시간</Label>
                    <select value={form.endHour} onChange={e => setForm(f => ({ ...f, endHour: +e.target.value }))} style={inputStyle}>
                      {HOURS.filter(h => h > form.startHour).map(h => <option key={h} value={h}>{h}:00</option>)}
                      <option value={19}>19:00</option>
                    </select>
                  </div>
                </div>
                <Label>회의실</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                  {ROOMS.map(r => (
                    <div key={r.id} onClick={() => setForm(f => ({ ...f, roomId: r.id }))}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: `2px solid ${form.roomId === r.id ? r.color : "#EDF0F7"}`, cursor: "pointer", background: form.roomId === r.id ? `${r.color}10` : "#fff", transition: "all 0.1s" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{r.name}</span>
                        <span style={{ fontSize: 11, color: "#8892B0", marginLeft: 6 }}>{r.floor} · {r.capacity}인</span>
                      </div>
                      {form.roomId === r.id && <span style={{ color: r.color, fontSize: 16 }}>✓</span>}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setModal(null)} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid #EDF0F7", background: "#fff", cursor: "pointer", fontWeight: 600 }}>취소</button>
                  <button onClick={handleBook} style={{ flex: 2, padding: "12px 0", borderRadius: 10, border: "none", background: "#3B6FE8", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>예약 확정</button>
                </div>
              </>
            ) : (
              <>
                {(() => {
                  const room = getRoomById(modal.booking.roomId);
                  return (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 18 }}>{modal.booking.title}</div>
                          <div style={{ fontSize: 13, color: "#8892B0", marginTop: 3 }}>{formatDate(selectedDate)}</div>
                        </div>
                        <span style={{ background: `${room.color}18`, color: room.color, fontWeight: 700, fontSize: 12, padding: "4px 10px", borderRadius: 20 }}>{room.name.split(" ")[0]}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                        <InfoRow icon="👤" label="주최자" value={modal.booking.organizer} />
                        <InfoRow icon="🏢" label="회의실" value={`${room.name} (${room.floor} · 최대 ${room.capacity}인)`} />
                        <InfoRow icon="⏰" label="시간" value={`${modal.booking.startHour}:00 – ${modal.booking.endHour}:00 (${modal.booking.endHour - modal.booking.startHour}시간)`} />
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setModal(null)} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid #EDF0F7", background: "#fff", cursor: "pointer", fontWeight: 600 }}>닫기</button>
                        <button onClick={() => handleDelete(modal.booking.id)} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "#FF4D6D", color: "#fff", cursor: "pointer", fontWeight: 700 }}>예약 취소</button>
                      </div>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const navBtnStyle = {
  width: 38, height: 38, borderRadius: 10, border: "none", background: "#fff", cursor: "pointer",
  fontSize: 20, color: "#8892B0", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center"
};

const inputStyle = {
  width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10,
  border: "1.5px solid #EDF0F7", fontSize: 14, marginBottom: 14, outline: "none",
  fontFamily: "inherit"
};

function Label({ children }) {
  return <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7594", marginBottom: 5 }}>{children}</div>;
}

function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#F8F9FC", borderRadius: 10, padding: "10px 12px" }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, color: "#8892B0", marginBottom: 1 }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
}

function FilterChip({ label, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${active ? color : "#E0E5EF"}`,
      background: active ? color : "#fff", color: active ? "#fff" : "#6B7594",
      fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.12s"
    }}>{label}</button>
  );
}
