# CLAUDE.md

このリポジトリのコードレビュー・実装時に、Claudeが従うべきプロジェクト固有のルールです。

## プロジェクト概要

Unity製「バックパックバトル」系ゲーム(バッグにアイテムをテトリス状に配置するオートバトラー)。
対戦形式はPvE専任(対人・非同期対戦なし)、2D、WebGLビルド(PC/モバイル両対応)、日本語のみ。

## アーキテクチャ方針(レビュー時に必ず確認する点)

- **層の分離を崩さないこと**
  - `Scripts/Data/`: マスタデータの型定義(ScriptableObjectではなくCSVから生成されるプレーンなC#クラス)。Unity実行時の状態を持たせない。
  - `Scripts/Core/`: MonoBehaviourに依存しない純粋なC#ロジック(`BackpackGrid`, `ItemInstance`等)。`UnityEngine.MonoBehaviour`への参照や`GameObject`操作を持ち込まないこと。
  - `Scripts/MasterData/`: CSVパース・マスタDB。
  - `Scripts/Unity/`: MonoBehaviour・UI連携層。ここ以外でMonoBehaviourを増やさない。
  - 新しいクラスを追加する際は、まずどの層に属するかを明確にすること。

- **ScriptableObjectは使わない**。アイテム等のマスタデータはCSV(`MasterData/*.csv`)→`ItemMasterDatabase`で読み込む方式に統一している。ScriptableObjectベースの実装を提案しないこと。

- **IItemContainer パターンを維持する**。バッグ(`BackpackGridArea`)・保留エリア(`HoldingArea`)など、アイテムのドラッグ&ドロップ受け入れ先を増やす場合は`IItemContainer`を実装し、`DragDropCoordinator`経由でのみやり取りすること。個別のMonoBehaviour同士を直接参照して密結合にしないこと。

- **新Input System必須**。`Input.GetKey`等の旧Input Managerを使うコードは指摘すること。ドラッグ&ドロップはuGUIのイベントハンドラ(`IBeginDragHandler`等)、それ以外の入力は`InputAction`をコードで直接生成する方式に統一している。

- **回転計算は`ItemShape.GetRotatedCells()`に集約する**。回転ロジックを他の場所に重複実装しないこと。

- **アイテムへの後付け能力は`ItemInstance.AttachedAbilities`(ラン限り、セーブ対象外)で管理する**。`ItemData`(マスタ)側を書き換えて実現しようとするコードは指摘すること(複数インスタンスへの意図しない影響が出るため)。

## コーディング規約

- Namespaceは`BackpackBattle`固定。
- publicメンバーはPascalCase、privateフィールドは`_camelCase`。
- コメント・ログメッセージは日本語。
- `using System.Linq`は必要最小限に留め、ホットパス(戦闘シミュレーション等、将来実装予定)では避ける。

## レビューで特に見てほしい観点

1. 層の混在(Core層にUnityEngine.MonoBehaviour依存が紛れ込んでいないか)
2. ドラッグ&ドロップ処理で`IItemContainer`を経由せず直接コンテナ同士をやり取りしていないか
3. CSVパース処理で例外処理・列名チェックが抜けていないか(列が足りない場合に落ちるべきかスキップすべきか)
4. 新しく追加された`enum`やタグに、抽選・シナジー等の既存ロジック側の対応漏れがないか
5. WebGLでの実行を想定した場合に問題のある処理(スレッド前提のAPI、ファイルI/O直書き等)がないか
