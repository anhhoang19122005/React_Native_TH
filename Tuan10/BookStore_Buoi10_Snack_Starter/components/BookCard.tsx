import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Book } from "../types";
import { formatPrice } from "../utils";
import { colors } from "../theme";

// TODO BT10.3a: khai báo interface BookCardProps gồm
//   book: Book; layout?: "row" | "tile"; onSelect: (id: string) => void
interface BookCardProps {
  book: Book;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
  isTile: boolean
}
// TODO BT10.3b: viết component BookCard
//   - bọc nội dung bằng TouchableOpacity, nhấn thì gọi onSelect(book.id)
//   - ảnh bìa (Image), tên sách, giá (formatPrice), rating (book.rating.toFixed(1)), ✅ hoặc ❌ theo inStock
// TODO BT10.4: xử lý layout "row" và "tile" trong CÙNG component này
//   - isTile = layout === "tile"
//   - style của thẻ: [styles.card, isTile && styles.cardTile]; làm tương tự cho coverBox và info
//   - tile: hiện nhãn rating (styles.ratingBadge) đè lên ảnh, tên sách 1 dòng, ẩn tác giả và thể loại
function BookCard({book, layout = 'row', onSelect} : BookCardProps) {
  const isTile = layout === 'tile'
  return (
    <TouchableOpacity onPress={() => onSelect(book.id)} style={[styles.card, isTile ? styles.cardTile : null]}>
      <View>
        <Image source={{uri: book.cover}} style={[styles.coverBox, isTile ? styles.coverBoxTile : null]}/>
        {isTile ? <Text style={styles.ratingBadge}>{book.rating.toFixed(1)}⭐</Text> : null}
      </View>
      <View style={[styles.info, isTile ? styles.infoTile : null]}>
        <Text style={styles.title}>{book.title}</Text>
        {!isTile ? (<Text style={styles.sub}>{book.author} - {book.category}</Text>) : null}
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(book.price)}</Text>
          <Text style={isTile ? styles.ratingBadge : null}>{book.inStock ? "✅" : "❌"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// TODO BT10.3c: đổi thành export default React.memo(BookCard)
export default React.memo(BookCard);

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 14, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: colors.line, gap: 12 },
  cardTile: { flexDirection: "column", width: "48%", gap: 8 },
  coverBox: { width: 70, height: 100, borderRadius: 8, overflow: "hidden", backgroundColor: colors.indigo },
  coverBoxTile: { width: "100%", height: "auto", aspectRatio: 2 / 3 }, // height "auto" để aspectRatio có hiệu lực
  cover: { width: "100%", height: "100%" },
  ratingBadge: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 11, fontWeight: "700", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, overflow: "hidden" },
  info: { flex: 1, gap: 4, justifyContent: "center" },
  infoTile: { flexGrow: 0, flexBasis: "auto" }, // không co về 0, để tên sách hiện đủ
  title: { fontSize: 15, fontWeight: "800", color: colors.text },
  sub: { fontSize: 12, color: colors.muted },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { color: colors.indigo, fontWeight: "800" },
});
